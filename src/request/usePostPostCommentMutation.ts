import { postPostComment } from "./postPostComment";
import { getUseGetPostCommentsQueryKey } from "./useGetPostCommentsQuery";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const USE_POST_POST_COMMENT_MUTATION_KEY = ["postPostComment"];

export const usePostPostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPostComment,
    mutationKey: USE_POST_POST_COMMENT_MUTATION_KEY,
    onSuccess: (data, { title }) => {
      const useGetPostCommentsQueryKey = getUseGetPostCommentsQueryKey(title);
      queryClient.setQueryData(useGetPostCommentsQueryKey, { comments: data.comments });
    },
  });
};
