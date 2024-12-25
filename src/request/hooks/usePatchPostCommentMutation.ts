import { patchPostComment } from "../axios"
import { postQueryOptions } from "../query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"

const USE_PATCH_POST_COMMENT_MUTATION_KEY = ["patchPostComment"]

export const usePatchPostCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchPostComment,
    mutationKey: USE_PATCH_POST_COMMENT_MUTATION_KEY,
    onSuccess: (data, { title }) => {
      queryClient.setQueryData(postQueryOptions.getPostComments({ title }).queryKey, {
        comments: data.comments,
      })
    },
  })
}
