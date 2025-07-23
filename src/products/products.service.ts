import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class ProductsService {
  private productController;

  constructor(private readonly firebaseService: FirebaseService) {
    this.productController = this.firebaseService
      .getFirestore()
      .collection('products');
  }

  async create(createProductDto: CreateProductDto) {
    const plainProduct = { ...createProductDto };

    const sanitizedProduct = Object.fromEntries(
      Object.entries(plainProduct).filter(([_, value]) => value !== undefined),
    );

    const docRef = await this.productController.add(sanitizedProduct);
    return { id: docRef.id, ...sanitizedProduct };
  }

  async findAll() {
    const snapshot = await this.productController.get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  }

  async findOne(id: string) {
    const data = await this.productController.doc(id).get();

    if (!data.exists) {
      throw new NotFoundException(`Producto con el id ${id} no encontrado`);
    }

    return {
      id: data.id,
      ...data.data(),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const docRef = this.productController.doc(id);

    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      throw new NotFoundException(`Producto con el ${id} no encontrado`);
    }

    const sanitizedProduct = Object.fromEntries(
      Object.entries(updateProductDto).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    await docRef.update(sanitizedProduct);

    return {
      id,
      ...sanitizedProduct,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
