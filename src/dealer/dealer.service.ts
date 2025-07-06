import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CollectionReference, DocumentData } from 'firebase-admin/firestore';
import { Bucket, File } from '@google-cloud/storage';

@Injectable()
export class DealerService {
  private dealerCollections: CollectionReference<DocumentData>;
  private bucket: Bucket;

  constructor(private readonly firebaseService: FirebaseService) {
    this.dealerCollections = this.firebaseService
      .getFirestore()
      .collection('dealer');
    this.bucket = this.firebaseService.getStorage();
  }

  private async uploadImage(
    fileBuffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<string> {
    const file = this.bucket.file(`dealers/${filename}`);

    await file.save(fileBuffer, {
      metadata: { contentType: mimetype },
      validation: 'md5',
    });

    await file.makePublic();

    return `https://storage.googleapis.com/${this.bucket.name}/${file.name}`;
  }

  private async getImageUrl(src: string | undefined): Promise<string | null> {
    if (!src) return null;

    try {
      // Si ya es una URL pública válida, la retornamos directamente
      if (src.startsWith('https://storage.googleapis.com/')) {
        return src;
      }

      // Opcional: Generar URL firmada temporal (comenta si no la necesitas)
      const filePath = src.split(`${this.bucket.name}/`)[1] || src;
      const file: File = this.bucket.file(filePath);

      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutos
      });

      return signedUrl;
    } catch (error) {
      console.error('Error al obtener URL de imagen:', error);
      return null;
    }
  }

  async create(
    dealer: CreateDealerDto,
    imageBuffer?: Buffer,
    imageName?: string,
    imageMimeType?: string,
  ) {
    let imageUrl: string | undefined;

    if (imageBuffer && imageName && imageMimeType) {
      imageUrl = await this.uploadImage(imageBuffer, imageName, imageMimeType);
    }

    const sanitizedDealer = Object.fromEntries(
      Object.entries({ ...dealer, src: imageUrl }).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    const docRef = await this.dealerCollections.add(sanitizedDealer);
    return { id: docRef.id, ...sanitizedDealer };
  }

  async findAll() {
    try {
      const snapshot = await this.dealerCollections.get();
      const dealers = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageUrl = await this.getImageUrl(data.src);
          return {
            id: doc.id,
            ...data,
            imageUrl, // Agregamos la URL de la imagen
          };
        }),
      );
      return dealers;
    } catch (error) {
      console.error('Error al obtener dealers:', error);
      throw new InternalServerErrorException('Error al recuperar los dealers');
    }
  }

  async findOne(id: string) {
    try {
      const doc = await this.dealerCollections.doc(id).get();
      if (!doc.exists) {
        throw new NotFoundException(`Dealer con id ${id} no encontrado`);
      }

      const data = doc.data();
      if (!data) {
        throw new NotFoundException(`Datos no encontrados para dealer ${id}`);
      }

      const imageUrl = await this.getImageUrl(data.src);

      return {
        id: doc.id,
        ...data,
        imageUrl,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error al obtener dealer ${id}:`, error);
      throw new InternalServerErrorException('Error al recuperar el dealer');
    }
  }

  async update(
    id: string,
    updateDealerDto: UpdateDealerDto,
    imageBuffer?: Buffer,
    imageName?: string,
    imageMimeType?: string,
  ) {
    const docRef = this.dealerCollections.doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new NotFoundException(`Dealer con id ${id} no encontrado`);
    }

    const data = docSnap.data();
    if (!data) {
      throw new NotFoundException(`Datos no encontrados para dealer ${id}`);
    }

    let imageUrl: string | undefined;

    // Procesar nueva imagen si se proporciona
    if (imageBuffer && imageName && imageMimeType) {
      imageUrl = await this.uploadImage(imageBuffer, imageName, imageMimeType);
    }

    const dataToUpdate = {
      ...updateDealerDto,
      ...(imageUrl ? { src: imageUrl } : {}), // Solo actualizar src si hay nueva imagen
    };

    // Eliminar campos undefined o vacíos
    const sanitizedData = Object.fromEntries(
      Object.entries(dataToUpdate).filter(
        ([_, value]) =>
          value !== undefined &&
          (typeof value !== 'string' || value.trim() !== ''),
      ),
    );

    await docRef.update(sanitizedData);
    const updatedDoc = await docRef.get();
    const updatedData = updatedDoc.data();

    if (!updatedData) {
      throw new NotFoundException(
        `Datos no encontrados después de actualizar dealer ${id}`,
      );
    }

    // Obtener URL de imagen (nueva o existente)
    const currentImageUrl = await this.getImageUrl(imageUrl || updatedData.src);

    return {
      id,
      ...updatedData,
      imageUrl: currentImageUrl,
    };
  }

  async remove(id: string) {
    const docRef = this.dealerCollections.doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new NotFoundException(`Dealer con id ${id} no encontrado`);
    }

    // Actualizar el status a "I" en lugar de eliminar
    await docRef.update({ status: 'I' });

    return {
      message: `Dealer con id ${id} marcado como inactivo correctamente`,
      id,
      status: 'I',
    };
  }
  async activate(id: string) {
    const docRef = this.dealerCollections.doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new NotFoundException(`Dealer con id ${id} no encontrado`);
    }

    // Actualizar el status a "I" en lugar de eliminar
    await docRef.update({ status: 'Ab' });

    return {
      message: `Dealer con id ${id} marcado como inactivo correctamente`,
      id,
      status: 'I',
    };
  }
}
