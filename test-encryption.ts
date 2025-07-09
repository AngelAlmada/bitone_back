import { EncryptionService } from './src/encryption.service';
import * as dotenv from 'dotenv';
dotenv.config();


const encryptionService = new EncryptionService();

const originalText = '5216684651054'; // por ejemplo, tu waId
const encrypted = encryptionService.encrypt(originalText);
const decrypted = encryptionService.decrypt(encrypted);

console.log('Texto original:', originalText);
console.log('Texto cifrado:', encrypted);
console.log('Texto descifrado:', decrypted);
