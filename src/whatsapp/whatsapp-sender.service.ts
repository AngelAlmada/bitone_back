import { Injectable,Logger } from "@nestjs/common";
import axios from "axios";

import * as dotenv from 'dotenv'
dotenv.config();

import { EncryptionService } from "src/encryption.service";

  
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN // El Token de accceso
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID; // El ID del número en WhatsApp Cloud

@Injectable()
export class WhatsappSenderService{
    private readonly logger = new Logger(WhatsappSenderService.name);
    
    constructor(
  private readonly encryptionService: EncryptionService,
) {}


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

  async sendMenuTemplate(to: string, encryptedWaId: string) {
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
          components: [
            {
              type: 'button',
              sub_type: 'url',
              index: 1, // el botón de "Realizar pedido"
              parameters: [
                {
                  type: 'text',
                  text: encryptedWaId,
                },
              ],
            },
          ],
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