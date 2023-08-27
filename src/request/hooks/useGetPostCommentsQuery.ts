import { getPostComments } from "../axios";
import { getUseGetPostCommentsQueryKey } from "../query-keys";

import { useSuspenseQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 10_000;

export const useGetPostCommentsQuery = (title: string) => {
  return useSuspenseQuery({
    queryFn: () => getPostComments({ title }),
    queryKey: getUseGetPostCommentsQueryKey(title),
    refetchInterval: REFETCH_INTERVAL,
  });
};
