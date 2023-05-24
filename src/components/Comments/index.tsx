import type { PropsWithChildren } from "react";
import styled from "styled-components";

import { CommentFormWithOpenButton } from "./CommentForm";
import CommentCard from "./CommentCard";
import CommentPostTitleContextProvider from "./context";

type Props = PropsWithChildren<{
  postTitle: string;
}>;
const Comments = ({ children, postTitle }: Props) => {
  return (
    <CommentPostTitleContextProvider postTitle={postTitle}>
      <Wrapper>{children}</Wrapper>
    </CommentPostTitleContextProvider>
  );
};

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

Comments.Title = Title;
Comments.Form = CommentFormWithOpenButton;
Comments.List = ({ children }: PropsWithChildren) => (
  <ol>{children}</ol>
);
Comments.Item = CommentCard;

export default Comments;
