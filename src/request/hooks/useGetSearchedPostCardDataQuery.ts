import { getSearchedPostCardData } from "../axios";

import { useQuery } from "@tanstack/react-query";

const USE_GET_SEARCHED_QUERY_KEY = "search";

const getUseGetSearchedPostCardDataQueryKey = (query: string) => [
  USE_GET_SEARCHED_QUERY_KEY,
  query,
];

export const useGetSearchedPostCardDataQuery = (query: string) => {
  return useQuery(getUseGetSearchedPostCardDataQueryKey(query), () =>
    getSearchedPostCardData(query),
  );
};
