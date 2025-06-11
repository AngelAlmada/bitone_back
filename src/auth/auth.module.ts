import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'; 
import { authService } from './auth.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController],
  providers: [authService]
})
export class AuthModule {}
