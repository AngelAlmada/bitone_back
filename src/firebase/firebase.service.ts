import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar las variables .env

@Injectable()
export class FirebaseService {
  private app: admin.app.App;
  private bucket: any;

  constructor() {
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    };

    if (!admin.apps.length) {
      this.app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });

      this.bucket = admin.storage().bucket(); // inicializa el bucket
    } else {
      this.app = admin.app();
      this.bucket = admin.storage().bucket();
    }
  }

  getAuth() {
    return this.app.auth();
  }

  getFirestore() {
    return this.app.firestore();
  }

  getStorage() {
    return this.bucket;
  }

  async uploadImage(fileBuffer: Buffer, filename: string, mimetype: string): Promise<string> {
    const uniqueName = `${Date.now()}_${filename}`;
    const file = this.bucket.file(`images/${uniqueName}`);

    const uuid = uuidv4();

    await file.save(fileBuffer, {
      metadata: {
        contentType: mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
      public: false,
      validation: 'md5',
    });

    const url = `https://firebasestorage.googleapis.com/v0/b/${this.bucket.name}/o/${encodeURIComponent(
      file.name,
    )}?alt=media&token=${uuid}`;

    return url;
  }
}
