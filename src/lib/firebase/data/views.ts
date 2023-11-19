import type { PostData } from "src/types/post";
import { encodeToPercentString } from "src/utils";

import { getDoc, getDocData, getPostDocRef, updateDoc } from "../_utils";

import { initializePost } from "./initialize/post";

import { type DocumentReference, FieldValue } from "firebase-admin/firestore";

const VIEW_COUNT_INTERVAL = 1_200_000; // 20 minutes

const increaseViewCount = async (postDocRef: DocumentReference<PostData>, currentTime: number) => {
  const result = await updateDoc(postDocRef, { views: FieldValue.arrayUnion(currentTime) });

  return result;
};

export const getPostViewsOnServerSide = async ({
  title,
  viewedAt,
}: {
  title: string;
  viewedAt?: string;
}) => {
  await initializePost(title);

  const encodedTitle = encodeToPercentString(title);
  const postDocRef = getPostDocRef(encodedTitle);

  const parsedViewedAt = Number(viewedAt);
  const currentTime = Date.now();
  const isViewCountShouldBeIncreased =
    isNaN(parsedViewedAt) || currentTime - parsedViewedAt > VIEW_COUNT_INTERVAL;

  if (isViewCountShouldBeIncreased) {
    await increaseViewCount(postDocRef, currentTime);
  }

  const postDoc = await getDoc(postDocRef);
  const { views } = getDocData(postDoc);

  return { isViewCountShouldBeIncreased, views: views.length };
};
