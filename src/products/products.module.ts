import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule], // Aquí sí importas el módulo
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
