import { getPostComments, getPostLikes, getPostViews } from "src/request/axios";
import {
  getUseGetPostCommentsQueryKey,
  getUseGetPostLikesQueryKey,
  getUseGetPostViewsQueryKey,
} from "src/request/query-keys";
import { getServerSideQueryClient } from "src/request/queryClient";

import { dehydrate, Hydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const HydratedPostData = async ({
  title,
  titleForComments,
  children,
}: PropsWithChildren<{ title: string; titleForComments: string }>) => {
  const queryClient = getServerSideQueryClient();
  await queryClient.prefetchQuery(getUseGetPostViewsQueryKey(title), () =>
    getPostViews({ title, viewedAt: Date.now() }),
  );
  await queryClient.prefetchQuery(getUseGetPostLikesQueryKey(title), () => getPostLikes({ title }));
  await queryClient.prefetchQuery(getUseGetPostCommentsQueryKey(titleForComments), () =>
    getPostComments({ title: titleForComments }),
  );

  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};
