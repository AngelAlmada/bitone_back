import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class ListService {
  private usersCollection;

  constructor(private readonly firebaseService: FirebaseService) {
    this.usersCollection = this.firebaseService
      .getFirestore()
      .collection('users');
  }

  async findAll() {
    const snapshot = await this.usersCollection.get();
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  }

  async findOneById(id: string) {
    const doc = await this.usersCollection.doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }
}

