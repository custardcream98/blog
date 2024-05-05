import { encodeToPercentString } from "src/utils"

import { getDoc, getDocData, getPostDocRef } from "../_utils"

import { initializePost } from "./initialize/post"

export const getPostLikesOnServerSide = async ({ title }: { title: string }) => {
  await initializePost(title)

  const encodedTitle = encodeToPercentString(title)
  const postDocRef = getPostDocRef(encodedTitle)
  const postDoc = await getDoc(postDocRef)

  return getDocData(postDoc)
}
