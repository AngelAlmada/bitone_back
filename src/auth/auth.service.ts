import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthDto } from './dto/auth-dto'

@Injectable()
export class authService {
  private usersCollections;

  constructor(private readonly firebaseService: FirebaseService) {
    this.usersCollections = this.firebaseService
      .getFirestore()
      .collection('users');
  }

  async getAuth(user: AuthDto) {
    const snapshot = await this.usersCollections
    .where('email', '==', user.email)
    .where('password', '==', user.password)
    .get();

    if (snapshot.empty){
        throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    //normalmente solo hay un usuario con ese email
    const userData = snapshot.docs[0].data();
    return {
        id: snapshot.docs[0].id,
        ...userData,
    };
  }
}
