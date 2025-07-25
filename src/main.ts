import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir peticiones desde otro origen
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://delivery-tacos.netlify.app',
      'https://fastorder.bit-one.net',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PUSH'],
    credentials: false, // actívalo si usas cookies o auth con sesiones
  });

  // Agrega el pipe global de validación con whitelist y forbidNonWhitelisted
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // arroja error si hay propiedades extras
      transform: true, // transforma el payload a la clase DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
