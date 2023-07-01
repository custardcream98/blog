import type { CommentData } from "src/types/comment";

import type { NextApiResponse } from "../_types";
import { normalizeNextApiResponse } from "../normalizers";

import { nextApi } from "./axios";

const GET_POST_COMMENTS_URL = "/post/comments";

export type GetPostCommentsRequest = {
  title: string;
};
export const getPostComments = async ({ title }: GetPostCommentsRequest) => {
  const response = await nextApi.get<NextApiResponse<{ comments: CommentData[] }>>(
    GET_POST_COMMENTS_URL,
    {
      params: { title },
    },
  );

  return normalizeNextApiResponse(response.data);
};
