import { encodeToPercentString } from "src/utils";

import { getDoc, getDocData, getPostDocRef } from "../_utils";

export const getPostLikesOnServerSide = async ({ title }: { title: string }) => {
  const encodedTitle = encodeToPercentString(title);
  const postDocRef = getPostDocRef(encodedTitle);
  const postDoc = await getDoc(postDocRef);

  return getDocData(postDoc);
};
