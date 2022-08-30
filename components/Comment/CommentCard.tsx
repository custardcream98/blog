import React, { useState } from "react";
import { Rings } from "react-loader-spinner";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import styled, { useTheme } from "styled-components";
import DateSpan from "../Common/DateSpan";
import ICommentData from "../../interfaces/comment";
import {
  deleteComment,
  getCommentDocRef,
  updateComment,
} from "../../lib/firebaseSetup/firebaseApps";

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
`;

const Comment = styled.p`
  margin-left: 0.2rem;
  text-align: start;
  font-size: 0.9rem;
`;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CommentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 5rem;
  margin-right: 5px;
`;

const CommentDateSpan = styled(DateSpan)`
  font-size: 0.6rem;
`;

const Username = styled.span`
  font-size: 0.9rem;
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
  }
`;

const EditForm = styled.form`
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const EditTextarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 4rem;
  padding: 0.5rem;
  margin-left: 0;
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.textColor};
  outline-width: 0;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 0.9rem;
`;

const SubmitEditBtn = styled.input`
  width: 3rem;
  height: 100%;
  text-align: center;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const CancelEditBtn = styled.button`
  width: 3rem;
  height: 100%;
  text-align: center;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  width: 6rem;

  @media (max-width: 800px) {
    flex-direction: column;
    width: 3rem;
  }
`;

const EditBtn = styled.button`
  margin: 0;
  padding: 0.2rem;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const PasswordForm = styled(EditForm)``;

const PasswordInput = styled.input`
  width: 100%;
  height: 1.9rem;
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.textColor};
  outline-width: 0;
  font-size: 0.9rem;
  @media (max-width: 800px) {
    height: 4rem;
  }
`;

const LoadingBtn = styled.div`
  height: 4rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
`;

type Props = {
  comment: ICommentData;
  title: string;
};

const CommentCard = ({ comment, title }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [commentText, setCommentText] = useState(comment.comment);
  const theme = useTheme();

  const commentDocRef = getCommentDocRef({ title, commentId: comment.id });

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    switch (event.currentTarget.name) {
      case "edit":
        setIsEditing(true);
        break;
      case "delete":
        setIsDeleting(true);
        break;
      case "cancel":
        setIsEditing(false);
        setIsPasswordCorrect(false);
        setIsDeleting(false);
        setPassword("");
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (event.target.name) {
      case "comment":
        setCommentText(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  };

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    switch (event.target.name) {
      case "password":
        if (isEditing) {
          if (password === comment.password) {
            setIsPasswordCorrect(true);
          } else {
            setIsPasswordCorrect(false);
            setIsEditing(false);
          }
        } else {
          if (password === comment.password) {
            await deleteComment(commentDocRef);
          }
          setIsDeleting(false);
        }
        setPassword("");
        break;
      case "comment":
        setIsLoading(true);
        if (comment.comment !== commentText) {
          await updateComment(commentDocRef, commentText);
        }
        setIsPasswordCorrect(false);
        setIsEditing(false);
        setIsLoading(true);
        break;
    }
  };

  return (
    <Container>
      <CommentInfoContainer>
        <Username>{comment.username}</Username>
        <CommentDateSpan date={comment.createdAt} />
      </CommentInfoContainer>
      {isEditing ? (
        isPasswordCorrect ? (
          <EditForm onSubmit={onSubmit} name="comment">
            <EditTextarea
              name="comment"
              value={commentText}
              onChange={onChange}
            />
            <BtnContainer>
              {isLoading ? (
                <LoadingBtn>
                  <Rings color={theme.bgColor} width="2rem" />
                </LoadingBtn>
              ) : (
                <>
                  <CancelEditBtn name="cancel" onClick={onClick}>
                    취소
                  </CancelEditBtn>
                  <SubmitEditBtn name="submit" value="수정" type="submit" />
                </>
              )}
            </BtnContainer>
          </EditForm>
        ) : (
          <PasswordForm onSubmit={onSubmit} name="password">
            <PasswordInput
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={onChange}
            />
            <BtnContainer>
              <CancelEditBtn name="cancel" onClick={onClick}>
                취소
              </CancelEditBtn>
              <SubmitEditBtn name="password" value="입력" type="submit" />
            </BtnContainer>
          </PasswordForm>
        )
      ) : isDeleting ? (
        <PasswordForm onSubmit={onSubmit} name="password">
          <PasswordInput
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={onChange}
          />
          <BtnContainer>
            <CancelEditBtn name="cancel" onClick={onClick}>
              취소
            </CancelEditBtn>
            <SubmitEditBtn name="password" value="입력" type="submit" />
          </BtnContainer>
        </PasswordForm>
      ) : (
        <CommentContainer>
          <Comment>{comment.comment}</Comment>
          <EditContainer>
            <EditBtn name="edit" onClick={onClick}>
              <AiFillEdit color={theme.textColor} size="0.9rem" />
            </EditBtn>
            <EditBtn name="delete" onClick={onClick}>
              <MdDelete color={theme.textColor} size="0.9rem" />
            </EditBtn>
          </EditContainer>
        </CommentContainer>
      )}
    </Container>
  );
};

export default CommentCard;
