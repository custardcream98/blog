import admin from "firebase-admin";
import {
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";

import { type FirebaseStorage } from "firebase/storage";
import { type Bucket } from "@google-cloud/storage";
import {
  initializeApp,
  getApp,
  type FirebaseApp,
} from "firebase/app";
import { firebaseConfig } from "..";

const credential = admin.credential.cert({
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey:
    process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
});

export class ServerSideFirebaseApp {
  private static _instance: ServerSideFirebaseApp | null;
  static get instance(): ServerSideFirebaseApp {
    if (!ServerSideFirebaseApp._instance) {
      return ServerSideFirebaseApp.initialize();
    }

    return ServerSideFirebaseApp._instance;
  }

  public adminApp: admin.app.App;
  public firebaseApp: FirebaseApp;
  public firebaseStorage: FirebaseStorage;
  public adminBucket: Bucket;

  constructor(
    adminApp: admin.app.App,
    firebaseApp: FirebaseApp
  ) {
    this.adminApp = adminApp;
    this.firebaseApp = firebaseApp;
    this.adminBucket = admin.storage(adminApp).bucket();
    this.firebaseStorage = getStorage(firebaseApp);
  }

  static initialize() {
    const adminApp =
      admin.apps[0] ??
      admin.initializeApp({
        credential,
        storageBucket:
          process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
      });

    let firebaseApp;
    try {
      firebaseApp = getApp();
    } catch (_error) {
      firebaseApp = initializeApp({
        ...firebaseConfig,
        storageBucket:
          process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
      });
    }

    ServerSideFirebaseApp._instance =
      new ServerSideFirebaseApp(adminApp, firebaseApp);

    return ServerSideFirebaseApp._instance;
  }

  static isFileExists = async (fileName: string) => {
    const file =
      ServerSideFirebaseApp.instance.adminBucket.file(
        fileName,
        {}
      );
    const [isExists] = await file.exists();

    return isExists;
  };

  static saveBufferOnBucket = async (
    fileName: string,
    buffer: Buffer
  ) => {
    const storageRef = ref(
      ServerSideFirebaseApp.instance.firebaseStorage,
      fileName
    );
    const file =
      ServerSideFirebaseApp.instance.adminBucket.file(
        storageRef.fullPath
      );

    await file.save(buffer);
  };

  static getDownloadURLFromStorage = async (
    fileName: string
  ) => {
    const storageRef = ref(
      ServerSideFirebaseApp.instance.firebaseStorage,
      fileName
    );
    const url = await getDownloadURL(storageRef);

    return url;
  };
}
