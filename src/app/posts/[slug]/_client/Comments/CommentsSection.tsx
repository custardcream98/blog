import { useGetPostCommentsQuery } from "src/request";

import CommentCard from "./CommentCard";
import CommentPostTitleContextProvider, { useCommentPostTitleContext } from "./context";

import type { PropsWithChildren } from "react";
import { utld } from "utility-class-components";

export { CommentFormWithOpenButton as CommentsSectionForm } from "./CommentForm";

type Props = PropsWithChildren<{
  postTitle: string;
}>;
export function CommentsSection({ children, postTitle }: Props) {
  return (
    <CommentPostTitleContextProvider postTitle={postTitle}>
      <Wrapper>{children}</Wrapper>
    </CommentPostTitleContextProvider>
  );
}

const Wrapper = utld.section`
  flex
  flex-col
  w-full
`;

export function CommentsSectionTitle() {
  const postTitle = useCommentPostTitleContext();
  const { data } = useGetPostCommentsQuery(postTitle);
  const comments = data ? data.comments : [];

  return <Title>Comments({comments.length})</Title>;
}

const Title = utld.h3`
  w-full
  font-medium
  text-[1.5rem]
  pb-2
  mb-4

  border-b-[3px]
  border-default-sub-light
  dark:border-default-sub-dark
  border-solid
`;

export function CommentsList() {
  const postTitle = useCommentPostTitleContext();
  const { data } = useGetPostCommentsQuery(postTitle);
  const comments = data ? data.comments : [];

  return (
    <ol>
      {comments.map((commentData) => (
        <CommentCard key={commentData.id} commentId={commentData.id} {...commentData} />
      ))}
    </ol>
  );
}
