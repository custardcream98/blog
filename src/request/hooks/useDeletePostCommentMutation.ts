import { deletePostComment } from "../axios"
import { getUseGetPostCommentsQueryKey } from "../query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"

const USE_DELETE_POST_COMMENT_MUTATION_KEY = ["deletePostComment"]

export const useDeletePostCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePostComment,
    mutationKey: USE_DELETE_POST_COMMENT_MUTATION_KEY,
    onSuccess: (data, { title }) => {
      const useGetPostCommentsQueryKey = getUseGetPostCommentsQueryKey(title)
      queryClient.setQueryData(useGetPostCommentsQueryKey, { comments: data.comments })
    },
  })
}
