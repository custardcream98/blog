import type { CommentData } from "src/types/comment";

import type { NextApiResponse } from "../_types";
import { normalizeNextApiResponse } from "../normalizers";

import { nextApi } from "./axios";

const POST_POST_COMMENT_URL = "/post/comments";
const POST_POST_COMMENT_PASSWORD_URL = `${POST_POST_COMMENT_URL}/password`;

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

export const postPostCommentPassword = async ({
  postTitle,
  commentId,
  password,
}: {
  postTitle: string;
  commentId: string;
  password: string;
}) => {
  const response = await nextApi.post<NextApiResponse<{ isValid: boolean }>>(
    POST_POST_COMMENT_PASSWORD_URL,
    {
      commentId,
      password,
      postTitle,
    },
  );

  return normalizeNextApiResponse(response.data);
};
