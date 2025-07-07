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

  async getAuth(
    user: AuthDto,
  ): Promise<{
    success: boolean;
    message?: string;
    email?: string;
    rol?: string;
  }> {
    const snapshot = await this.usersCollections
      .where('email', '==', user.email)
      .where('password', '==', user.password)
      .get();

    if (!snapshot.empty) {
      const userData = snapshot.docs[0].data();

      if (userData.status === 'I') {
        // Usuario desactivado
        return {
          message: 'Usuario desactivado',
          success: false
        };
      }

      return {
        success: true,
        email: userData.email,
        rol: userData.rol,
      };
    }

    return { success: false, message: 'Credenciales inválidas' };
  }
}
