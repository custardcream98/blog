import type { CommentData } from "src/types/comment";

import type { NextApiResponse } from "../_types";
import { normalizeNextApiResponse } from "../normalizers";

import { nextApi } from "./axios";

const PATCH_POST_COMMENT_URL = "/post/comments";

export type PatchPostCommentRequest = {
  title: string;
  password: string;
  commentId: string;
  comment?: string;
  username?: string;
};
export const patchPostComment = async ({
  title,
  password,
  commentId,
  ...restData
}: PatchPostCommentRequest) => {
  const response = await nextApi.patch<
    NextApiResponse<{ comments: CommentData[]; deletedAt: number }>
  >(PATCH_POST_COMMENT_URL, {
    id: commentId,
    password,
    title,
    ...restData,
  });

  return normalizeNextApiResponse(response.data);
};
