import { getSearchedPostCardData } from "../axios"
import { getUseGetSearchedPostCardDataQueryKey } from "../query-keys"

import { useQuery } from "@tanstack/react-query"

const CACHE_TIME = 60_000_000 // an hour
const STALE_TIME = 60_000_000 // an hour

export const useGetSearchedPostCardDataQuery = (query: string) => {
  return useQuery({
    cacheTime: CACHE_TIME,

    queryFn: () => getSearchedPostCardData(query),

    queryKey: getUseGetSearchedPostCardDataQueryKey(query),

    staleTime: STALE_TIME,
  })
}
