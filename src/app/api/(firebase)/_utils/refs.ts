import { ServerSideFirebaseApp } from "src/lib/firebaseSetup/server";
import type { CommentData } from "src/types/comment";

import { Collections } from "./constants";

import { type CollectionReference } from "firebase-admin/firestore";

const firestore = ServerSideFirebaseApp.instance.adminFirestore;

export const postsRef = firestore.collection(Collections.POSTS);

export const getPostDocRef = (postTitle: string) => {
  return postsRef.doc(postTitle);
};

export const getCommentCollectionRef = (postTitle: string) => {
  const postDocRef = getPostDocRef(postTitle);
  return postDocRef.collection(Collections.COMMENTS) as CollectionReference<
    Omit<CommentData, "id">
  >;
};
