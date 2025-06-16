import { WhatsappService } from './whatsapp.service';
import { WhatsappSenderService } from './whatsapp-sender.service';
import { Module } from '@nestjs/common';

import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [WhatsappService, WhatsappSenderService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
