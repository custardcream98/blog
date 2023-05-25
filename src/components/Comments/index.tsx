import CommentCard from "./CommentCard";
import { CommentFormWithOpenButton } from "./CommentForm";
import CommentPostTitleContextProvider from "./context";

import type { PropsWithChildren } from "react";
import styled from "styled-components";

type Props = PropsWithChildren<{
  postTitle: string;
}>;
function Comments({ children, postTitle }: Props) {
  return (
    <CommentPostTitleContextProvider postTitle={postTitle}>
      <Wrapper>{children}</Wrapper>
    </CommentPostTitleContextProvider>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h3`
  width: 100%;
  font-weight: 500;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #25282c;
`;

function CommentsList({ children }: PropsWithChildren) {
  return <ol>{children}</ol>;
}

Comments.Title = Title;
Comments.Form = CommentFormWithOpenButton;
Comments.List = CommentsList;
Comments.Item = CommentCard;

export default Comments;
