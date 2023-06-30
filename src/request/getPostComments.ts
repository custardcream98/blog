import type { CommentData } from "src/types/comment";

import type { NextApiResponse } from "./_types";
import { nextApi } from "./axios";
import { normalizeNextApiResponse } from "./normalizeNextApiResponse";

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
