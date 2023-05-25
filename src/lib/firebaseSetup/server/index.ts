import { type Bucket } from "@google-cloud/storage";
import { type App as FirebaseAdminApp, cert, getApps, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const credential = cert({
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
});
const STORAGE_BUCKET = process.env.FIREBASE_ADMIN_STORAGE_BUCKET;

export class ServerSideFirebaseApp {
  private static _instance: ServerSideFirebaseApp | null;
  static get instance(): ServerSideFirebaseApp {
    if (!ServerSideFirebaseApp._instance) {
      return ServerSideFirebaseApp.initialize();
    }

    return ServerSideFirebaseApp._instance;
  }

  public adminApp: FirebaseAdminApp;
  public adminBucket: Bucket;

  constructor(adminApp: FirebaseAdminApp) {
    this.adminApp = adminApp;
    this.adminBucket = getStorage(adminApp).bucket();
  }

  static initialize() {
    const adminApp =
      getApps()[0] ??
      initializeApp({
        credential,
        storageBucket: STORAGE_BUCKET,
      });

    ServerSideFirebaseApp._instance = new ServerSideFirebaseApp(adminApp);

    return ServerSideFirebaseApp._instance;
  }

  static isFileExists = async (fileName: string) => {
    const file = ServerSideFirebaseApp.instance.adminBucket.file(fileName, {});
    const [isExists] = await file.exists();

    return isExists;
  };

  static saveBufferOnBucket = async ({
    fileName,
    buffer,
    makePublic = false,
  }: {
    fileName: string;
    buffer: Buffer;
    makePublic?: boolean;
  }) => {
    const file = ServerSideFirebaseApp.instance.adminBucket.file(fileName);

    await file.save(buffer);

    if (makePublic) {
      await file.makePublic();
    }
  };

  static getDownloadURLFromStorage = (fileName: string) => {
    const file = ServerSideFirebaseApp.instance.adminBucket.file(fileName);

    const url = file.publicUrl();

    return url;
  };
}
