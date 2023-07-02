import { getPostLikes } from "../axios";
import { getUseGetPostLikesQueryKey } from "../query-keys";

import { useQuery } from "@tanstack/react-query";

export const useGetPostLikesQuery = (title: string) => {
  return useQuery({
    cacheTime: 0,
    queryFn: () => getPostLikes({ title }),
    queryKey: getUseGetPostLikesQueryKey(title),
  });
};
