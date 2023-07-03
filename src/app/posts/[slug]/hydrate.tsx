import { getPostCommentsForHydration } from "src/app/api/(firebase)/post/comments/route";
import { getPostLikesForHydration } from "src/app/api/(firebase)/post/likes/route";
import { getPostViewsForHydration } from "src/app/api/(firebase)/post/views/route";
import {
  getUseGetPostCommentsQueryKey,
  getUseGetPostLikesQueryKey,
  getUseGetPostViewsQueryKey,
} from "src/request/query-keys";

import { dehydrate, Hydrate, QueryClient } from "@tanstack/react-query";
import { cache, type PropsWithChildren } from "react";

const getQueryClientOnServerSide = cache(() => {
  return new QueryClient();
});

export async function HydratedPostData({ title, children }: PropsWithChildren<{ title: string }>) {
  const queryClient = getQueryClientOnServerSide();

  await queryClient.prefetchQuery({
    queryFn: () => getPostLikesForHydration(title),
    queryKey: getUseGetPostLikesQueryKey(title),
  });

  await queryClient.prefetchQuery({
    queryFn: () => getPostViewsForHydration(title),
    queryKey: getUseGetPostViewsQueryKey(title),
  });

  await queryClient.prefetchQuery({
    queryFn: () => getPostCommentsForHydration(title),
    queryKey: getUseGetPostCommentsQueryKey(title),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
}
