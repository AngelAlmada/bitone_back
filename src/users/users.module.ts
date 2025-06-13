import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LogginMiddleware } from './loggin/loggin.middleware';
import { AuthMiddleware } from './auth/auth.middleware';
import { CreateModule } from './create/create.module';
import { ListModule } from './list/list.module';
import { DesactivateModule } from './desactivate/desactivate.module';
import { UpdateModule } from './update/update.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [CreateModule, ListModule, DesactivateModule, UpdateModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogginMiddleware)
      .forRoutes({ path: '/users', method: RequestMethod.GET })
      .apply(AuthMiddleware)
      .forRoutes('users');
  }
}
