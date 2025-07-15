// src/cliente/cliente.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EncryptionService } from 'src/encryption.service';

@Controller('api/client')
export class ClientController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly encryptionService: EncryptionService
  ) {}

  @Get(':token')
  async getCliente(@Param('token') token: string) {
    try {
      console.log('🔐 Token recibido:', token);
      
      const waId = this.encryptionService.decrypt(token);
      console.log('✅ waId descifrado:', waId);

      const db = this.firebaseService.getFirestore();
      const docRef = db.collection('whatsapp_clients').doc(waId);
      const doc = await docRef.get();

      if (!doc.exists) {
        return {
          nombre: 'Cliente no registrado',
          numero: waId,
        };
      }

      const data = doc.data();

      return {
        nombre: data?.name || 'Sin nombre',
        numero: data?.phone_number || waId,
      };
    } catch (error) {
      console.error('❌ Error al desencriptar o consultar el cliente:', error);
      return {
        nombre: 'Error al procesar',
        numero: '-',
      };
    }
  }
}
