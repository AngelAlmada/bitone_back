import { EncryptionService } from './src/encryption.service';

const encryptionService = new EncryptionService();

const originalText = 'lilieth'; // por ejemplo, tu waId
const encrypted = encryptionService.encrypt(originalText);
const decrypted = encryptionService.decrypt(encrypted);

console.log('Texto original:', originalText);
console.log('Texto cifrado:', encrypted);
console.log('Texto descifrado:', decrypted);
