import { getPostLikes } from "../axios";

import { useQuery } from "@tanstack/react-query";

const USE_GET_POST_LIKES_QUERY_KEY = "likes";

export const getUseGetPostLikesQueryKey = (title: string) => [USE_GET_POST_LIKES_QUERY_KEY, title];

export const useGetPostLikesQuery = (title: string) => {
  return useQuery({
    cacheTime: 0,
    queryFn: () => getPostLikes({ title }),
    queryKey: getUseGetPostLikesQueryKey(title),
  });
};
