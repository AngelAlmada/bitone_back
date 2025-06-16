import { Controller, Get, Post,Query, Res,Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { WhatsappService } from './whatsapp.service';
import * as dotenv from 'dotenv'
dotenv.config
 
@Controller('webhook')
export class AppController {
  constructor(private readonly whatsappService: WhatsappService) {}

  // Verificación inicial del webhook
  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN // el que pusiste en Meta en admin webhook
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verificado correctamente');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  // Recepción de mensajes
  @Post()
  async receiveMessage(@Body() body: any) {
    await this.whatsappService.handleIncoming(body);
    return { success: true };
  }
}