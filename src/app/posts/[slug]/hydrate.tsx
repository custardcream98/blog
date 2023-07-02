import { getPostCommentsForHydration } from "src/app/api/(firebase)/post/comments/route";
import { getPostLikesForHydration } from "src/app/api/(firebase)/post/likes/route";
import { getPostViewsForHydration } from "src/app/api/(firebase)/post/views/route";
import {
  getUseGetPostCommentsQueryKey,
  getUseGetPostLikesQueryKey,
  getUseGetPostViewsQueryKey,
} from "src/request/query-keys";
import { getQueryClient } from "src/request/queryClient";

import { dehydrate, Hydrate } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

export async function HydratedPostData({ title, children }: PropsWithChildren<{ title: string }>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => getPostLikesForHydration(title),
    queryKey: getUseGetPostLikesQueryKey(title),
    staleTime: 0,
  });

  await queryClient.prefetchQuery({
    queryFn: () => getPostViewsForHydration(title),
    queryKey: getUseGetPostViewsQueryKey(title),
    staleTime: 0,
  });

  await queryClient.prefetchQuery({
    queryFn: () => getPostCommentsForHydration(title),
    queryKey: getUseGetPostCommentsQueryKey(title),
    staleTime: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
}
