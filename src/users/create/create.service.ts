import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-create.dto';
import { UpdateCreateDto } from './dto/update-create.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class CreateService {
  private usersCollections;

  constructor(private readonly firebaseService: FirebaseService) {
    this.usersCollections = this.firebaseService
      .getFirestore()
      .collection('users');
  }
  async createUser(user: CreateUserDto) {
    const docRef = await this.usersCollections.add(user);
    return { id: docRef.id, ...user };
  }
}
