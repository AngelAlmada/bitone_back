import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-create.dto';
import { UpdateUserDto } from './dto/update-create-dto'; // Importa el DTO de actualización
import { FirebaseService } from 'src/firebase/firebase.service';
import * as admin from 'firebase-admin';
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

    // Eliminar propiedades undefined
    const sanitizedUser = Object.fromEntries(
      Object.entries(plainUser).filter(([_, value]) => value !== undefined),
    );

    // Crear batch para operaciones atómicas
    const batch = this.firebaseService.getFirestore().batch();

    // Crear referencia para nuevo usuario en 'users'
    const userDocRef = this.usersCollections.doc(); // doc sin id genera uno nuevo automáticamente

    // Agregar creación usuario al batch
    batch.set(userDocRef, sanitizedUser);

    // Crear referencia para doc en 'authorisation' con el mismo id que usuario
    const authDocRef = this.firebaseService
      .getFirestore()
      .collection('authorisation')
      .doc(userDocRef.id);

    // Definir datos para autorización (puedes ajustar según tu modelo)
    const authData = {
      userId: userDocRef.id,
      roles: ['user'], // rol por defecto, por ejemplo
      permissions: [],
    };

    // Agregar creación doc autorización al batch
    batch.set(authDocRef, authData);

    // Ejecutar batch
    await batch.commit();

    // Retornar usuario con id generado
    return { id: userDocRef.id, ...sanitizedUser };
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
