// src/whatsapp.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { checkFirstMessageOfDay } from './whatsapp.utils';
import { WhatsappSenderService } from './whatsapp-sender.service';
import axios from 'axios';
import * as dotenv from 'dotenv' //tokens de whatsapp
dotenv.config(); 

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN // El Token de accceso
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID; // El ID del número en WhatsApp Cloud

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);


   constructor(
    private readonly firebaseService: FirebaseService,
    private readonly whatsappSender: WhatsappSenderService,
  ) {}

  async handleIncoming(body: any) { //flujo principal del chat
    try {
      const db = this.firebaseService.getFirestore();

      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (!value?.messages || !value.contacts) {
      this.logger.warn('Evento no relacionado con mensajes, se ignora.');
      return;
      }

      const contacto = value.contacts[0];
      const message = value.messages[0];


      const from = message?.from;
      const text = message?.text?.body?.toLowerCase();

      const nombre = contacto?.profile?.name || 'Cliente';
      const waId = contacto?.wa_id || from;



      const esPrimerMensaejeDelDia = await checkFirstMessageOfDay(db,waId,nombre, from);

      if (esPrimerMensaejeDelDia) { 
        await this.whatsappSender.sendWelcomeTemplate(from);
    }


      
      this.logger.log(`Cuerpo recibido: ${JSON.stringify(body, null, 2)}`);

      if (!message || !from) return;

      // Acción basada en botones
      if (message.type === 'button' && message.button?.payload === 'Ver Menu') {
        await this.whatsappSender.sendMenuImage(from);
        return;
      }

      // Primera interacción o texto libre
      await this.whatsappSender.sendMenuTemplate(from);
    } catch (error) {
      this.logger.error('Error en handleIncoming:', error?.response?.data || error.message);
    }
  }

  
}