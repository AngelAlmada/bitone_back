import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-key.json';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor() {
  if (!admin.apps.length) {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: 'deliverybitone.appspot.com',
    });
  } else {
    this.app = admin.app(); // Usa la app ya existente
  }
}


  getAuth() {
    return this.app.auth();
  }

  getFirestore() {
    return this.app.firestore();
  }

  getStorage() {
    return this.app.storage().bucket();
  }
}
