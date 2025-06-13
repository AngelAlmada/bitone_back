import { Module } from '@nestjs/common';
import { DesactivateService } from './desactivate.service';
import { DesactivateController } from './desactivate.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [DesactivateController],
  providers: [DesactivateService],
})
export class DesactivateModule {}
