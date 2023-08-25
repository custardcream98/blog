import { getPostCommentsOnServerSide } from "src/lib/firebase/data/comments";
import { getPostLikesOnServerSide } from "src/lib/firebase/data/likes";
import { getPostViewsOnServerSide } from "src/lib/firebase/data/views";
import {
  getUseGetPostCommentsQueryKey,
  getUseGetPostLikesQueryKey,
  getUseGetPostViewsQueryKey,
} from "src/request/query-keys";
import { getServerSideQueryClient } from "src/request/queryClient";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const HydratePostQueryClient = async ({
  children,
  title,
  titleForComments,
}: PropsWithChildren<{ title: string; titleForComments: string }>) => {
  const queryClient = getServerSideQueryClient();

  await queryClient.prefetchQuery({
    queryFn: async () => {
      const result = await getPostViewsOnServerSide({ title, viewedAt: Date.now().toString() });
      return {
        isIncreased: result.isViewCountShouldBeIncreased,
        views: result.views,
      };
    },
    queryKey: getUseGetPostViewsQueryKey(title),
  });

  await queryClient.prefetchQuery({
    queryFn: () => getPostLikesOnServerSide({ title }),
    queryKey: getUseGetPostLikesQueryKey(title),
  });

  await queryClient.prefetchQuery({
    queryFn: () => getPostCommentsOnServerSide({ title: titleForComments }),
    queryKey: getUseGetPostCommentsQueryKey(titleForComments),
  });

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
