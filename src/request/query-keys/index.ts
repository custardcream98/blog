import {
  getPostComments,
  GetPostCommentsRequest,
  getPostLikes,
  GetPostLikesRequest,
  getPostViews,
  GetPostViewsRequest,
  getSearch,
} from "src/request/axios"

import { queryOptions } from "@tanstack/react-query"

export const postQueryOptions = {
  all: () => ["post"],
  getPostComments: (params: GetPostCommentsRequest) =>
    queryOptions({
      queryFn: () => getPostComments(params),
      queryKey: [...postQueryOptions.all(), "comments", params],
      refetchInterval: 10_000,
    }),
  getPostLikes: (params: GetPostLikesRequest) =>
    queryOptions({
      queryFn: () => getPostLikes(params),
      queryKey: [...postQueryOptions.all(), "likes", params],
      refetchInterval: 10_000,
    }),
  getPostViews: (params: GetPostViewsRequest) =>
    queryOptions({
      queryFn: () => getPostViews(params),
      // params.viewedAt은 의도적으로 쿼리키에서 제외 (유저 개인의 조회 시간 정보임)
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...postQueryOptions.all(), "views", params.title],
      refetchInterval: 10_000,
    }),
}

export const searchQueryOptions = {
  all: () => ["search"],
  getSearch: (query: string) =>
    // 검색 결과는 영구적으로 캐싱해도 문제 없음
    queryOptions({
      gcTime: Infinity,
      queryFn: () => getSearch(query),
      queryKey: [...searchQueryOptions.all(), query],
      staleTime: Infinity,
    }),
}
