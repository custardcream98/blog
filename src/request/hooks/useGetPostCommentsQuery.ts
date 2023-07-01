import { getPostComments } from "../axios";

import { useQuery } from "@tanstack/react-query";

const USE_GET_POST_COMMENTS_QUERY_KEY = "comments";

export const getUseGetPostCommentsQueryKey = (title: string) => [
  USE_GET_POST_COMMENTS_QUERY_KEY,
  title,
];

export const useGetPostCommentsQuery = (title: string) => {
  return useQuery({
    cacheTime: 0,
    queryFn: () => getPostComments({ title }),
    queryKey: getUseGetPostCommentsQueryKey(title),
  });
};
