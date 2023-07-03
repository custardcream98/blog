import { getPostLikes } from "../axios";
import { getUseGetPostLikesQueryKey } from "../query-keys";

import { useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 5_000;

export const useGetPostLikesQuery = (title: string) => {
  return useQuery({
    queryFn: () => getPostLikes({ title }),
    queryKey: getUseGetPostLikesQueryKey(title),
    refetchInterval: REFETCH_INTERVAL,
  });
};
