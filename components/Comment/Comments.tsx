import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { fireStore } from "../../lib/firebaseSetup";
import {
  COLLECTION_COMMENTS,
  COLLECTION_POSTS,
} from "../../lib/firebaseSetup/collectionNames";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import ICommentData from "../../interfaces/comment";

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
    onSnapshot(
      collection(fireStore, COLLECTION_POSTS, title, COLLECTION_COMMENTS),
      (snapshot) => {
        const commentsArr: ICommentData[] = [];
        snapshot.docs
          .sort((post1, post2) =>
            post1.data().createdAt > post2.data().createdAt ? -1 : 1
          )
          .map((doc) =>
            commentsArr.push({ ...(doc.data() as ICommentData), id: doc.id })
          );
        setComments((_) => [...commentsArr]);
      }
    );
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
