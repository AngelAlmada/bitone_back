import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class DesactivateService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async activateUser(id: string): Promise<string> {
    // Suponiendo que tus usuarios están en Firestore en la colección "users"
    const userRef = this.firebaseService
      .getFirestore()
      .collection('users')
      .doc(id);

    // Actualizamos el campo 'status' a "I"
    await userRef.update({ status: 'A' });

    return `Usuario con ID ${id} Activado correctamente.`;
  }

  async deactivateUser(id: string): Promise<string> {
    // Suponiendo que tus usuarios están en Firestore en la colección "users"
    const userRef = this.firebaseService
      .getFirestore()
      .collection('users')
      .doc(id);

    // Actualizamos el campo 'status' a "I"
    await userRef.update({ status: 'I' });

    return `Usuario con ID ${id} desactivado correctamente.`;
  }
}
