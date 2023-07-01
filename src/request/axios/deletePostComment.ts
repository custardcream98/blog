import type { CommentData } from "src/types/comment";

import type { NextApiResponse } from "../_types";
import { normalizeNextApiResponse } from "../normalizers";

import { nextApi } from "./axios";

const DELETE_POST_COMMENT_URL = "/post/comments/delete";

export type DeletePostCommentRequest = {
  title: string;
  password: string;
  commentId: string;
};
export const deletePostComment = async ({
  title,
  password,
  commentId,
}: DeletePostCommentRequest) => {
  const response = await nextApi.post<
    NextApiResponse<{ comments: CommentData[]; deletedAt: number }>
  >(DELETE_POST_COMMENT_URL, {
    commentId,
    password,
    title,
  });

  return normalizeNextApiResponse(response.data);
};
