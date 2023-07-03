import { getPostComments } from "../axios";
import { getUseGetPostCommentsQueryKey } from "../query-keys";

import { useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 5_000;

export const useGetPostCommentsQuery = (title: string) => {
  return useQuery({
    queryFn: () => getPostComments({ title }),
    queryKey: getUseGetPostCommentsQueryKey(title),
    refetchInterval: REFETCH_INTERVAL,
  });
};
