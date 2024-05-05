import { ServerSideFirebaseApp } from "src/lib/firebase"
import type { CommentData } from "src/types/comment"
import type { PostData } from "src/types/post"

import { type CollectionReference } from "firebase-admin/firestore"

const firestore = ServerSideFirebaseApp.instance.adminFirestore

const POSTS_COLLECTION_KEY = "posts"
const COMMENTS_COLLECTION_KEY = "comments"

export const postsCollectionRef = firestore.collection(
  POSTS_COLLECTION_KEY,
) as CollectionReference<PostData>

export const getPostDocRef = (postTitle: string) => {
  return postsCollectionRef.doc(postTitle)
}

export const getCommentsCollectionRef = (postTitle: string) => {
  const postDocRef = getPostDocRef(postTitle)
  return postDocRef.collection(COMMENTS_COLLECTION_KEY) as CollectionReference<
    Omit<CommentData, "id">
  >
}

export const getCommentDocRef = (postTitle: string, commentId: string) => {
  const commentsCollectionRef = getCommentsCollectionRef(postTitle)
  return commentsCollectionRef.doc(commentId)
}
