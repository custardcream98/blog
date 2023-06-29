import { ServerSideFirebaseApp } from "src/lib/firebaseSetup/server";

import { Collections } from "./collection";

const firestore = ServerSideFirebaseApp.instance.adminFirestore;

export const postsRef = firestore.collection(Collections.POSTS);

export const getPostDocRef = (title: string) => {
  return postsRef.doc(title);
};
