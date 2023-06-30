import type { NextApiResponse } from "./_types";
import { nextApi } from "./axios";
import { normalizeNextApiResponse } from "./normalizeNextApiResponse";

const PATCH_POST_LIKES_URL = "/post/likes";

export type PatchPostLikesRequest = {
  title: string;
  shouldLike: boolean;
};
export const patchPostLikes = async ({ title, shouldLike }: PatchPostLikesRequest) => {
  const response = await nextApi.patch<NextApiResponse<{ likes: number }>>(PATCH_POST_LIKES_URL, {
    shouldLike,
    title,
  });

  return normalizeNextApiResponse(response.data);
};
