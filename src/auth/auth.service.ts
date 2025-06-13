import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthDto } from './dto/auth-dto';

@Injectable()
export class authService {
  private usersCollections;

  constructor(private readonly firebaseService: FirebaseService) {
    this.usersCollections = this.firebaseService
      .getFirestore()
      .collection('users');
  }

  async getAuth(user: AuthDto): Promise<{ success: boolean; email?: string; role?: string }> {
    const snapshot = await this.usersCollections
      .where('email', '==', user.email)
      .where('password', '==', user.password)
      .get();

    if (!snapshot.empty) {
      const userData = snapshot.docs[0].data();
      return {
        success: true,
        email: userData.email,
        role: userData.role, // aquí debería estar el valor 'A' o 'U' o lo que uses
      };
    }

    return { success: false };
  }
}
