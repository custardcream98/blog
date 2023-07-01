import { ServerSideFirebaseApp } from "src/lib/firebase";
import type { CommentData } from "src/types/comment";
import type { PostData } from "src/types/post";

import { Collections } from "./constants";

import { type CollectionReference } from "firebase-admin/firestore";

const firestore = ServerSideFirebaseApp.instance.adminFirestore;

export const postsCollectionRef = firestore.collection(
  Collections.POSTS,
) as CollectionReference<PostData>;

export const getPostDocRef = (postTitle: string) => {
  return postsCollectionRef.doc(postTitle);
};

export const getCommentsCollectionRef = (postTitle: string) => {
  const postDocRef = getPostDocRef(postTitle);
  return postDocRef.collection(Collections.COMMENTS) as CollectionReference<
    Omit<CommentData, "id">
  >;
};

export const getCommentDocRef = (postTitle: string, commentId: string) => {
  const commentsCollectionRef = getCommentsCollectionRef(postTitle);
  return commentsCollectionRef.doc(commentId);
};
