import { getSearchedPostCardData } from "../axios";
import { getUseGetSearchedPostCardDataQueryKey } from "../query-keys";

import { useQuery } from "@tanstack/react-query";

export const useGetSearchedPostCardDataQuery = (query: string) => {
  return useQuery(getUseGetSearchedPostCardDataQueryKey(query), () =>
    getSearchedPostCardData(query),
  );
};
