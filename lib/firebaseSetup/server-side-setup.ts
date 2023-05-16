import admin from "firebase-admin";
import { type Bucket } from "@google-cloud/storage";
import { FirebaseApp } from "firebase/app";
import {
  ref,
  getDownloadURL,
  type FirebaseStorage,
  getStorage,
} from "firebase/storage";

export class FirebaseServerSideApp {
  private readonly firebaseStorage: FirebaseStorage;
  readonly adminApp: admin.app.App;
  readonly adminBucket: Bucket;

  constructor(firebaseApp: FirebaseApp) {
    this.firebaseStorage = getStorage(firebaseApp);

    const _adminApp = admin.initializeApp(
      {
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail:
            process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey:
            process.env.FIREBASE_ADMIN_PRIVATE_KEY,
        }),
        storageBucket:
          process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
      },
      "admin"
    );

    this.adminApp = _adminApp;
    const adminStorage = _adminApp.storage();
    this.adminBucket = adminStorage.bucket("thumbnails");
  }

  getFile(filename: string) {
    return this.adminBucket.file(filename);
  }

  async getDownloadUrl(filename: string) {
    const file = this.getFile(filename);
    const [isFileExists] = await file.exists();

    if (!isFileExists) {
      return "";
    }

    const storageRef = ref(this.firebaseStorage, filename);
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  }

  async deleteInstance() {
    await this.adminApp.delete();
  }
}
