// create.module.ts
import { Module } from '@nestjs/common';
import { CreateService } from './create.service';
import { CreateController } from './create.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';  // importa la entidad User

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Importa el repositorio de User
  ],
  controllers: [CreateController],
  providers: [CreateService],
})
export class CreateModule {}
