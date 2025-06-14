import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-key.json';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;
  private bucket: any;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: 'deliverybitone.firebasestorage.app', // nombre de tu bucket
    });

    // Aquí debes llamar a bucket() para obtener el Bucket
    this.bucket = this.app.storage().bucket();
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

  async uploadImage(
    fileBuffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<string> {
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
