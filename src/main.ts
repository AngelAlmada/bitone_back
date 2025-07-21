import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir peticiones desde otro origen
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://delivery-tacos.netlify.app',
        // Agrega aquí tus dominios oficiales
      ];

      // Permite peticiones sin origin (como las de curl o servidores internos)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // si usas cookies o auth por sesión
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
