// create.module.ts
import { Module } from '@nestjs/common';
import { CreateService } from './create.service';
import { CreateController } from './create.controller';
import { FirebaseModule } from 'src/firebase/firebase.module'; // importa el módulo, no el servicio

@Module({
  imports: [FirebaseModule],  // Aquí sí importas el módulo
  controllers: [CreateController],
  providers: [CreateService],
})
export class CreateModule {}
