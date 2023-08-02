import { getPostCommentsOnServerSide } from "src/app/api/(firebase)/post/comments/route";
import { getPostLikesOnServerSide } from "src/app/api/(firebase)/post/likes/route";
import { getPostViewsOnServerSide } from "src/app/api/(firebase)/post/views/route";
import { HydrateQueryClient } from "src/components/client";
import {
  getUseGetPostCommentsQueryKey,
  getUseGetPostLikesQueryKey,
  getUseGetPostViewsQueryKey,
} from "src/request/query-keys";
import { getServerSideQueryClient } from "src/request/queryClient";

import { dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const HydratePostQueryClient = async ({
  children,
  title,
  titleForComments,
}: PropsWithChildren<{ title: string; titleForComments: string }>) => {
  const queryClient = getServerSideQueryClient();
  await queryClient.prefetchQuery(getUseGetPostViewsQueryKey(title), async () => {
    const result = await getPostViewsOnServerSide({ title, viewedAt: Date.now().toString() });
    return {
      isIncreased: result.isViewCountShouldBeIncreased,
      views: result.views,
    };
  });
  await queryClient.prefetchQuery(getUseGetPostLikesQueryKey(title), () =>
    getPostLikesOnServerSide({ title }),
  );
  await queryClient.prefetchQuery(getUseGetPostCommentsQueryKey(titleForComments), () =>
    getPostCommentsOnServerSide({ title: titleForComments }),
  );

  const dehydratedState = dehydrate(queryClient);

  return <HydrateQueryClient state={dehydratedState}>{children}</HydrateQueryClient>;
};
