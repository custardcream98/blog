import type { SearchedPostCardDataRaw } from "src/types/searchedPosts"

import { normalizeSearchedPosts } from "../normalizers"

import { nextApi } from "./axios"

const GET_SEARCHED_POSTS_URL = "/search"

export const getSearch = async (query: string) => {
  const response = await nextApi.get<SearchedPostCardDataRaw[]>(GET_SEARCHED_POSTS_URL, {
    params: { q: query },
  })

  return normalizeSearchedPosts(response.data)
}
