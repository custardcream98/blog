import { getPostViews } from "../axios";
import { getUseGetPostViewsQueryKey } from "../query-keys";

import { useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 10_000;

export const useGetPostViewsQuery = (title: string, viewedAt?: number) => {
  return useQuery({
    queryFn: () => getPostViews({ title, viewedAt }),
    queryKey: getUseGetPostViewsQueryKey(title),
    refetchInterval: REFETCH_INTERVAL,
  });
};
