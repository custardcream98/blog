import type { CommentData } from "src/types/comment";

import type { NextApiResponse } from "./_types";
import { nextApi } from "./axios";
import { normalizeNextApiResponse } from "./normalizeNextApiResponse";

const POST_POST_COMMENT_URL = "/post/comments";

export type PostPostCommentRequest = {
  title: string;
  password: string;
  comment: string;
  username: string;
};
export const postPostComment = async ({
  title,
  password,
  comment,
  username,
}: PostPostCommentRequest) => {
  const response = await nextApi.post<
    NextApiResponse<{ comments: CommentData[]; created: string }>
  >(POST_POST_COMMENT_URL, {
    comment,
    password,
    title,
    username,
  });

  return normalizeNextApiResponse(response.data);
};
