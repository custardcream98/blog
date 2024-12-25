import { postPostComment, postPostCommentPassword } from "../axios"
import { postQueryOptions } from "../query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"

const USE_POST_POST_COMMENT_MUTATION_KEY = ["postPostComment"]

export const usePostPostCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postPostComment,
    mutationKey: USE_POST_POST_COMMENT_MUTATION_KEY,
    onSuccess: (data, { title }) => {
      queryClient.setQueryData(postQueryOptions.getPostComments({ title }).queryKey, {
        comments: data.comments,
      })
    },
  })
}

const USE_POST_POST_COMMENT_PASSWORD_MUTATION_KEY = ["postPostCommentPassword"]

export const usePostPostCommentPassword = () => {
  return useMutation({
    mutationFn: postPostCommentPassword,
    mutationKey: USE_POST_POST_COMMENT_PASSWORD_MUTATION_KEY,
  })
}
