import { postPostComment, postPostCommentPassword } from "../axios";
import { getUseGetPostCommentsQueryKey } from "../query-keys";

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

export const usePostPostCommentPassword = () => {
  return useMutation(postPostCommentPassword);
};
