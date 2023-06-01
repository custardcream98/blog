import Button from "src/components/Common/Button";
import { deleteComment } from "src/lib/firebaseSetup/firebaseApps";
import useEditable from "src/lib/hook/useEditable";
import { CommentEditState } from "src/types/comment";

import { useCommentPostTitleContext } from "../../../context";
import { useCommentDataContext } from "../../context";
import { useCommentEditorStateSetter } from "../context";

import CommentOverlapWrapper from "./CommentOverlapWrapper";

import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { utld } from "utility-class-components";

type Props = {
  stateTo: CommentEditState;
};
export default function CheckPasswordState({ stateTo }: Props) {
  const { changeStateTo } = useCommentEditorStateSetter();
  const postTitle = useCommentPostTitleContext();
  const { commentId, password } = useCommentDataContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [isAnimatingShake, setIsAnimatingShake] = useState(false);
  const handleShakeAnimationStart = useCallback(() => {
    setIsAnimatingShake(true);
  }, []);
  const handleShakeAnimationEnd = useCallback(() => {
    setIsAnimatingShake(false);
  }, []);

  const [isDeleting, setIsDeleting] = useState(false);

  const [inputPasswordRef, getPasswordVal, clearPasswordInput] = useEditable<HTMLInputElement>();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const isPasswordCorrect = password === getPasswordVal();

      if (!isPasswordCorrect) {
        handleShakeAnimationStart();
        clearPasswordInput();
        return setErrorMessage("비밀번호가 틀렸습니다.");
      }

      if (stateTo === CommentEditState.DELETE) {
        setIsDeleting(true);
        await deleteComment({
          commentId,
          title: postTitle,
        });
        return;
      }

      return changeStateTo(stateTo);
    },
    [
      password,
      getPasswordVal,
      clearPasswordInput,
      stateTo,
      changeStateTo,
      commentId,
      postTitle,
      handleShakeAnimationStart,
    ],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputPasswordRef.current?.focus();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [inputPasswordRef]);

  return (
    <CommentOverlapWrapper closer={<CommentOverlapWrapper.CloseButtonWithIcon />}>
      <Form onSubmit={handleFormSubmit}>
        <Label htmlFor='password'>비밀번호를 입력해주세요.</Label>
        <InputWrapper>
          <Input
            ref={inputPasswordRef}
            id='password'
            type='password'
            placeholder='비밀번호'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck={false}
            required
          />
          <SubmitButton type='submit' width='40px' height='25px' isLoading={isDeleting}>
            입력
          </SubmitButton>
          {errorMessage && (
            <ErrorMessage
              isAnimatingShake={isAnimatingShake}
              onAnimationEnd={handleShakeAnimationEnd}
            >
              {errorMessage}
            </ErrorMessage>
          )}
        </InputWrapper>
      </Form>
    </CommentOverlapWrapper>
  );
}

const InputWrapper = utld.div`
  relative
`;

const Form = utld.form`
  relative
  text-[0.9rem]
`;
const Label = utld.label`
  block

  mb-[0.4rem]
`;
const Input = utld.input`
  rounded-[5px]

  h-[1.5625rem]
  w-[12.5rem]

  px-[0.3rem]

  bg-bg-light
  dark:bg-bg-dark

  border
  border-default-light
  dark:border-default-dark
`;

const SubmitButton = utld(Button)`
  absolute
  left-[12.8125rem]
`;

type ErrorMessageProps = { isAnimatingShake: boolean };

const ErrorMessage = utld.span<ErrorMessageProps>`
  absolute
  top-[1.8125rem]
  left-0

  text-red-500
  text-[0.8rem]

  ${({ isAnimatingShake }) => isAnimatingShake && "animate-shake"}
`;
