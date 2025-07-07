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

@Module({
  imports: [UsersModule, AuthModule, HelloModule, PaymentsModule, FirebaseModule, DealerModule, ProductsModule, WhatsappModule],


  controllers: [AppController],
  providers: [AppService,WhatsappService,FirebaseService],
})
export class AppModule {}
