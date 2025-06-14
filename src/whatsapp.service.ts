// src/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Logger } from '@nestjs/common';

const WHATSAPP_TOKEN = 'EAAbTay7hTwwBO097afM2zHMVCUabXZBycMal9DgneZCt36GbMRobtD2c7WNGjaTM0ExtxLWU361pMgORmsc34H6hfQzvmCORLZAgQ8HtiDoUJZAhuAwR1Shu6fXl6M3P2qqMAOqXTBahuF2uPkTDcPiDM5DXVt9e7jh7hx70zaQhiPlZCmcVpfiifPRG89XODooql9C4fisQnVuoLlp1vOnpLbCQF3ZCIxQZCMZD'; // El Token de accceso
const PHONE_NUMBER_ID = '678992935298299'; // El ID del número en WhatsApp Cloud

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  async handleIncoming(body: any) { //flujo principal del chat
    try {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messages?.[0];
      const from = message?.from;
      const text = message?.text?.body?.toLowerCase();

      
      this.logger.log(`Cuerpo recibido: ${JSON.stringify(body, null, 2)}`);

      if (!message || !from) return;

      // Acción basada en botones
      if (message.type === 'button' && message.button?.payload === 'Ver Menu') {
        await this.sendMenuImage(from);
        return;
      }

      // Primera interacción o texto libre
      await this.sendMenuTemplate(from);
    } catch (error) {
      this.logger.error('Error en handleIncoming:', error?.response?.data || error.message);
    }
  }

  async sendMessage(to: string, text: string) { //enviar mensaje
    try {
      const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to,
          text: { body: text },
        },
        {
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      this.logger.error('Error al enviar mensaje:', error?.response?.data || error.message);
    }
  }

  async sendMenuTemplate(to: string) { //plantilla menu principal
    try {
      const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template: {
            name: 'menu_principal',
            language: { code: 'es' },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      this.logger.error('Error al enviar plantilla de menú:', error?.response?.data || error.message);
    }
  }

  async sendMenuImage(to: string) {  //boton del menu - plantilla menu principal
    try {
      const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'image',
          image: {
            link: 'https://media.istockphoto.com/id/898916122/es/foto/astronauta-en-el-espacio-en-el-fondo-del-mundo-en-cat-elementos-de-esta-imagen-proporcionada.jpg?s=612x612&w=0&k=20&c=IVLjoAr35YeLFvJ_fgnSxiCjjF9tDUfQSKSOIqF_geg=', // url de la imagen del menu
          },
        },
        {
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      this.logger.error('Error al enviar imagen del menú:', error?.response?.data || error.message);
    }
  }

  async sendWelcomeTemplate(to: string) { //mensaje de bienvenida - nota: configurar para que se envie solo al ser la primera interaccion del chat. la db ajustar con campo ultima actividad del cliente respecto al dia
  try {
    const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
    await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: 'bienvenida', // plantilla
          language: { code: 'es' },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    this.logger.error('Error al enviar plantilla de bienvenida:', error?.response?.data || error.message);
  }
}

}