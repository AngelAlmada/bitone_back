import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HelloModule } from './hello/hello.module';
import { PaymentsModule } from './payments/payments.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [UsersModule, AuthModule, HelloModule, PaymentsModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
