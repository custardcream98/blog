import { getPostComments } from "../axios";
import { getUseGetPostCommentsQueryKey } from "../query-keys";

import { useQuery } from "@tanstack/react-query";

export const useGetPostCommentsQuery = (title: string) => {
  return useQuery({
    cacheTime: 0,
    queryFn: () => getPostComments({ title }),
    queryKey: getUseGetPostCommentsQueryKey(title),
  });
};
