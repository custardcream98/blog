import type { SearchedPostCardDataRaw } from "src/types/searchedPosts";

import { nextApi } from "./axios";
import { normalizeSearchedPosts } from "./normalizeSearchedPosts";

const GET_SEARCHED_POSTS_URL = "/search";

export const getSearchedPostCardData = async (query: string) => {
  const response = await nextApi.get<SearchedPostCardDataRaw[]>(GET_SEARCHED_POSTS_URL, {
    params: { q: query },
  });

  return normalizeSearchedPosts(response.data);
};
