import type { NextApiResponse } from "../_types"
import { normalizeNextApiResponse } from "../normalizers"

import { nextApi } from "./axios"

const GET_POST_LIKES_URL = "/post/likes"

export type GetPostLikesRequest = {
  title: string
}
export const getPostLikes = async ({ title }: GetPostLikesRequest) => {
  const response = await nextApi.get<NextApiResponse<{ likes: number }>>(GET_POST_LIKES_URL, {
    params: { title },
  })

  return normalizeNextApiResponse(response.data)
}
