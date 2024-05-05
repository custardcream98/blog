const USE_GET_POST_VIEWS_QUERY_KEY = "views"
export const getUseGetPostViewsQueryKey = (title: string) => [USE_GET_POST_VIEWS_QUERY_KEY, title]

const USE_GET_POST_COMMENTS_QUERY_KEY = "comments"
export const getUseGetPostCommentsQueryKey = (title: string) => [
  USE_GET_POST_COMMENTS_QUERY_KEY,
  title,
]

const USE_GET_POST_LIKES_QUERY_KEY = "likes"
export const getUseGetPostLikesQueryKey = (title: string) => [USE_GET_POST_LIKES_QUERY_KEY, title]

const USE_GET_SEARCHED_QUERY_KEY = "search"
export const getUseGetSearchedPostCardDataQueryKey = (query: string) => [
  USE_GET_SEARCHED_QUERY_KEY,
  query,
]
