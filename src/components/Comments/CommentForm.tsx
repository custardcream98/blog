import Button from "src/components/Common/Button";
import useCommentForm from "src/lib/hook/useCommentForm";

import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";

type Props = {
  height?: string;
  isFormOpened?: boolean;
  isForEdit?: boolean;
};
function CommentForm({ height, isFormOpened = true, isForEdit = false }: Props) {
  const { usernameRef, passwordRef, commentRef, isLoading, handleCommentSubmit } =
    useCommentForm(isForEdit);

  return (
    <StyledForm formHeight={height} hidden={!isFormOpened} onSubmit={handleCommentSubmit}>
      <label className='sr-only' htmlFor='input-id'>
        아이디를 입력해주세요.
      </label>
      <InputUsername
        ref={usernameRef}
        id='input-id'
        type='text'
        placeholder='아이디'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        required
      />
      <label className='sr-only' htmlFor='input-password'>
        비밀번호를 입력해주세요.
      </label>
      <InputPassword
        ref={passwordRef}
        id='input-password'
        type='password'
        placeholder='비밀번호'
        minLength={4}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        required
      />
      <label className='sr-only' htmlFor='textarea-comment'>
        댓글을 입력해주세요.
      </label>
      <TextareaContent
        formHeight={height}
        ref={commentRef}
        id='textarea-comment'
        placeholder='댓글을 입력해주세요.'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        required
      />
      <SubmitCommentButton type='submit' width='66px' height='30px' isLoading={isLoading}>
        {isForEdit ? "수정하기" : "댓글 달기"}
      </SubmitCommentButton>
    </StyledForm>
  );
}

function CommentFormWithOpenButton() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const openCommentForm = useCallback(() => setIsFormOpened(true), []);

  return (
    <>
      <CommentForm isFormOpened={isFormOpened} />
      <FormOpenButton type='button' hidden={isFormOpened} onClick={openCommentForm}>
        댓글을 입력해주세요.
      </FormOpenButton>
    </>
  );
}

const cssRoundedBox = css`
  border: 1px solid ${({ theme }) => theme.subTextColor};
  color: ${({ theme }) => theme.textColor};
  border-radius: 5px;
`;

type StyledFormProps = {
  formHeight?: string;
};
const StyledForm = styled.form<StyledFormProps>`
  position: relative;

  width: 100%;
  height: ${({ formHeight }) => (formHeight ? formHeight : "150px")};

  overflow: hidden;

  background-color: ${({ theme }) => theme.subTextColor};

  ${cssRoundedBox}
`;

const FormOpenButton = styled.button`
  width: 100%;
  height: 50px;
  font-family: ${({ theme }) => theme.mainFont};
  font-weight: 300;

  cursor: pointer;

  ${cssRoundedBox}
`;

const cssEditable = css`
  padding: 0.5rem;

  ${({ theme }) => css`
    font-family: ${theme.mainFont};
    background-color: ${theme.bgColor};
    color: ${theme.textColor};

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px ${theme.bgColor} inset !important;
      -webkit-text-fill-color: ${theme.textColor} !important;
    }

    :focus {
      outline: 2px solid ${theme.accentColor};
      outline-offset: -3px;
      border-radius: 5px;
    }
  `}
`;

const InputUsername = styled.input`
  width: calc(50% - 0.5px);
  height: 30px;
  ${cssEditable}
`;
const InputPassword = styled(InputUsername)`
  margin-left: 1px;
`;

type TextareaContentProps = {
  formHeight?: string;
};
const TextareaContent = styled.textarea<TextareaContentProps>`
  display: block;
  margin-top: 1px;
  ${({ formHeight }) =>
    formHeight
      ? css`
          height: calc(100% - 31px);
        `
      : css`
          height: 117px;
        `};
  width: 100%;

  resize: none;

  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 300;

  @media (max-width: 780px) {
    font-size: 0.8rem;
  }

  ${cssEditable}
`;

const SubmitCommentButton = styled(Button)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export { CommentFormWithOpenButton };
export default CommentForm;
