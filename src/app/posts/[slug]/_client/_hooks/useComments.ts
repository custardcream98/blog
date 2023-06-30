import { useGetPostCommentsQuery } from "src/request";

export const useComments = (postTitle: string) => {
  const { data } = useGetPostCommentsQuery(postTitle);

  return data ? data.comments : [];
};
