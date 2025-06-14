import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-create.dto';
import { UpdateUserDto } from './dto/update-create-dto'; // Importa el DTO de actualización
import { FirebaseService } from 'src/firebase/firebase.service';
// 
@Injectable()
export class CreateService {
  private usersCollections;

  constructor(private readonly firebaseService: FirebaseService) {
    this.usersCollections = this.firebaseService
      .getFirestore()
      .collection('users');
  }

  async createUser(user: CreateUserDto) {
    // Convertir a objeto plano (evita prototype issues)
    const plainUser = { ...user };

    // Eliminar todas las propiedades que tengan valor undefined (como id)
    const sanitizedUser = Object.fromEntries(
      Object.entries(plainUser).filter(([_, value]) => value !== undefined),
    );

    const docRef = await this.usersCollections.add(sanitizedUser);
    return { id: docRef.id, ...sanitizedUser };
  }

  async updateUser(id: string, userData: UpdateUserDto) {
    try {
      const dataToUpdate = { ...userData };

      // Eliminar password si es vacío o undefined
      if (!dataToUpdate.password) {
        delete dataToUpdate.password;
      }

      // Eliminar todas las propiedades undefined para evitar error Firestore
      for (const key in dataToUpdate) {
        if (dataToUpdate[key] === undefined) {
          delete dataToUpdate[key];
        }
      }

      const userDoc = this.usersCollections.doc(id);
      await userDoc.update(dataToUpdate);

      const updatedUser = await userDoc.get();
      return { id, ...updatedUser.data() };
    } catch (error) {
      throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
    }
  }
}
