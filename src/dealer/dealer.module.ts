import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DealerService } from './dealer.service';
import { DealerController } from './dealer.controller';
import { AuthMiddleware } from 'src/dealer/auth/auth.middleware';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { LogginMiddleware } from './loggin/loggin.middleware';

@Module({
  imports: [FirebaseModule],
  controllers: [DealerController],
  providers: [DealerService],
})
export class DealerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogginMiddleware)
      .forRoutes({ path: 'dealer', method: RequestMethod.GET }) // No poner '/' al inicio
      .apply(AuthMiddleware)
      .forRoutes('dealer'); // También sin '/'
  }
}
