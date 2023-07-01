import { patchPostComment } from "./patchPostComment";
import { getUseGetPostCommentsQueryKey } from "./useGetPostCommentsQuery";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const USE_PATCH_POST_COMMENT_MUTATION_KEY = ["patchPostComment"];

export const usePatchPostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPostComment,
    mutationKey: USE_PATCH_POST_COMMENT_MUTATION_KEY,
    onSuccess: (data, { title }) => {
      const useGetPostCommentsQueryKey = getUseGetPostCommentsQueryKey(title);
      queryClient.setQueryData(useGetPostCommentsQueryKey, { comments: data.comments });
    },
  });
};
