import { encodeToPercentString } from "src/utils"

import { getDoc, getPostDocRef, setDoc } from "../../_utils"

export const initializePost = async (title: string) => {
  const encodedTitle = encodeToPercentString(title)
  const postDocRef = getPostDocRef(encodedTitle)

  const isPostDocExist = (await getDoc(postDocRef)).exists

  if (isPostDocExist) {
    return
  }

  const result = await setDoc(postDocRef, {
    likes: 0,
    views: [],
  })

  return result
}
