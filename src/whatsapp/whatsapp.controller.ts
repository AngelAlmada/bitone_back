import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('webhook')
export class WhatsappController {
  @Post()
  recibirMensaje(@Req() request: Request) {
    const body = request.body;

    // Procesar mensaje entrante
    console.log('Mensaje recibido de WhatsApp:', JSON.stringify(body, null, 2));

    // Puedes aquí responder o actualizar estado de pedido, etc.
    return { status: 'ok' };
  }
}
