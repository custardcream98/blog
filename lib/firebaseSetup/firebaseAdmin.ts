import admin from "firebase-admin"
import { getStorage } from "firebase/storage"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebaseApp);

admin.initializeApp(firebaseConfig);
export const adminBucket = admin.storage().bucket();