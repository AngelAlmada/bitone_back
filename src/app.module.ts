import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HelloModule } from './hello/hello.module';
import { PaymentsModule } from './payments/payments.module';
import { FirebaseModule } from './firebase/firebase.module';

import { DealerModule } from './dealer/dealer.module';
import { ProductsModule } from './products/products.module';

import { WhatsappService } from './whatsapp/whatsapp.service';
import { FirebaseService } from './firebase/firebase.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { ClientController } from './client/client.controller';
import { EncryptionService } from './encryption.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bit-one.net',        // Cambia según tu servidor
      port: 3306,
      username: 'angelmi1_angelmha',
      password: 'Copete4549@',
      database: 'angelmi1_fastorder',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,       // SOLO para desarrollo
    }),

    UsersModule,
    AuthModule,
    HelloModule,
    PaymentsModule,
    FirebaseModule,
    DealerModule,
    ProductsModule,
    WhatsappModule,
  ],

  controllers: [AppController, ClientController],
  providers: [AppService, WhatsappService, FirebaseService, EncryptionService],
})
export class AppModule {}
