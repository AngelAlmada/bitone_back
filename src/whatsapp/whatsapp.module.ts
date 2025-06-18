import { WhatsappService } from './whatsapp.service';
import { WhatsappSenderService } from './whatsapp-sender.service';
import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common/interfaces';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { checkFirstMessageOfDay } from './whatsapp.utils';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [FirebaseModule],
  providers: [WhatsappService, WhatsappSenderService,FirebaseService],
  exports: [WhatsappService,WhatsappSenderService],
})
export class WhatsappModule {}
