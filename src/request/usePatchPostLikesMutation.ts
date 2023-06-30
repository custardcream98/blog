import { patchPostLikes } from "./patchPostLikes";
import { getUseGetPostLikesQueryKey } from "./useGetPostLikesQuery";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const USE_PATCH_POST_MUTATION_KEY = ["patchPostLikes"];

export const usePatchPostLikesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPostLikes,
    mutationKey: USE_PATCH_POST_MUTATION_KEY,
    onSuccess: (data, { title }) => {
      const useGetPostLikesQueryKey = getUseGetPostLikesQueryKey(title);
      queryClient.setQueryData(useGetPostLikesQueryKey, data);
    },
  });
};
