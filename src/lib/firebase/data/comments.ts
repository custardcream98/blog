import type { CommentData, CommentDataWithoutPassword } from "src/types/comment"
import { encodeToPercentString, sortObjectArray } from "src/utils"

import { getCollection, getCommentsCollectionRef, getDocData } from "../_utils"

import { CollectionReference } from "firebase-admin/firestore"

export const getComments = async (
  commentsCollectionRef: CollectionReference<Omit<CommentData, "id">>,
): Promise<CommentDataWithoutPassword[]> => {
  const commentSnapshot = await getCollection(commentsCollectionRef)
  const commentsUnordered = commentSnapshot.docs.map((doc) => ({ ...getDocData(doc), id: doc.id }))
  const comments = sortObjectArray(commentsUnordered, "createdAt")

  // exclude password

  const commentsWithoutPassword = comments.map(({ password: _, ...rest }) => rest)

  return commentsWithoutPassword
}

export const getPostCommentsOnServerSide = async ({ title }: { title: string }) => {
  const encodedTitle = encodeToPercentString(title)

  const commentsCollectionRef = getCommentsCollectionRef(encodedTitle)
  const comments = await getComments(commentsCollectionRef)

  return { comments }
}
