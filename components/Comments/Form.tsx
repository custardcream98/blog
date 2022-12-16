import React, { memo } from "react";
import { Rings } from "react-loader-spinner";
import styled, { useTheme } from "styled-components";

import useCommentForm from "../../lib/hook/useCommentForm";

const StyledForm = styled.form`
  width: 100%;
  margin-bottom: 1rem;
`;

const NamePasswordContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  padding-left: 0.3rem;
  width: 50%;
  height: 1.9rem;
  box-sizing: border-box;
  outline-width: 0;
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.textColor};
  border-bottom: none;
  outline-color: ${(props) => props.theme.textColor};
  :first-of-type {
    border-top-left-radius: 4px;
  }
  :last-of-type {
    border-left: none;
    border-top-right-radius: 4px;
  }
`;

const SubmitBtn = styled.button`
  width: 3rem;
  text-align: center;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  border-color: transparent;
  border-bottom-right-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 4rem;
  padding: 0.5rem;
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.textColor};
  border-bottom-left-radius: 4px;
  outline-width: 0;
  font-size: 0.9rem;
  font-weight: 300;
  font-family: ${(props) => props.theme.mainFont};
`;

const LoadingBtn = styled.div`
  height: 4rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
`;

const SubmitContainer = styled.div`
  display: flex;
`;

type Props = {
  title: string;
};

const Form = ({ title }: Props) => {
  const {
    usernameRef,
    passwordRef,
    commentRef,
    isLoading,
    handleCommentSubmit,
  } = useCommentForm(title);
  const theme = useTheme();

  return (
    <StyledForm onSubmit={handleCommentSubmit}>
      <NamePasswordContainer>
        <label className="sr-only" htmlFor="username">
          닉네임
        </label>
        <Input
          ref={usernameRef}
          type="text"
          name="username"
          placeholder="닉네임"
          id="username"
          autoComplete="off"
          required
        />
        <label className="sr-only" htmlFor="password">
          비밀번호
        </label>
        <Input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="비밀번호"
          id="password"
          required
          autoComplete="off"
          minLength={4}
        />
      </NamePasswordContainer>
      <SubmitContainer>
        <label className="sr-only" htmlFor="comment">
          댓글 내용
        </label>
        <Textarea
          ref={commentRef}
          name="comment"
          id="comment"
          required
        />
        {isLoading ? (
          <LoadingBtn>
            <Rings color={theme.bgColor} width="2rem" />
          </LoadingBtn>
        ) : (
          <SubmitBtn>입력</SubmitBtn>
        )}
      </SubmitContainer>
    </StyledForm>
  );
};

export default memo(Form);
