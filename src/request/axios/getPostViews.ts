import type { NextApiResponse } from "../_types"
import { normalizeNextApiResponse } from "../normalizers"

import { nextApi } from "./axios"

const GET_POST_VIEWS_URL = "/post/views"

export type GetPostViewsRequest = {
  title: string
  viewedAt?: number
}
export const getPostViews = async ({ title, viewedAt }: GetPostViewsRequest) => {
  const response = await nextApi.get<NextApiResponse<{ views: number; isIncreased: boolean }>>(
    GET_POST_VIEWS_URL,
    {
      params: { title, viewedAt },
    },
  )

  return normalizeNextApiResponse(response.data)
}
