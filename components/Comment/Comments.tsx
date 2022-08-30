import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import ICommentData from "../../interfaces/comment";
import { getComments } from "../../lib/firebaseSetup/firebaseApps";

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentSection = styled.h1`
  width: 100%;
  font-weight: 500;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #25282c;
`;

type Props = {
  title: string;
};

const Comments = ({ title }: Props) => {
  const [comments, setComments] = useState<ICommentData[]>([]);

  useEffect(() => {
    getComments(title, setComments);
  }, []);

  return (
    <CommentsContainer>
      <CommentSection>Comments({comments.length})</CommentSection>
      <CommentForm title={title} />
      {React.Children.toArray(
        comments.map((comment) => (
          <CommentCard comment={comment} title={title} />
        ))
      )}
    </CommentsContainer>
  );
};

export default Comments;
