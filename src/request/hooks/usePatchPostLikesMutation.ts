import { patchPostLikes } from "../axios"
import { postQueryOptions } from "../query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"

const USE_PATCH_POST_MUTATION_KEY = ["patchPostLikes"]

export const usePatchPostLikesMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchPostLikes,
    mutationKey: USE_PATCH_POST_MUTATION_KEY,
    onSuccess: (data, { title }) => {
      queryClient.setQueryData(postQueryOptions.getPostLikes({ title }).queryKey, data)
    },
  })
}
