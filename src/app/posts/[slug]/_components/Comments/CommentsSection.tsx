import CommentCard from "./CommentCard";
import { CommentFormWithOpenButton } from "./CommentForm";
import CommentPostTitleContextProvider from "./context";

import type { PropsWithChildren } from "react";
import { utld } from "utility-class-components";

type Props = PropsWithChildren<{
  postTitle: string;
}>;
function CommentsSectionWrapper({ children, postTitle }: Props) {
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

function CommentsList({ children }: PropsWithChildren) {
  return <ol>{children}</ol>;
}

export const CommentsSection = Object.assign(CommentsSectionWrapper, {
  Form: CommentFormWithOpenButton,
  Item: CommentCard,
  List: CommentsList,
  Title,
});
