import {
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled, { keyframes, css } from "styled-components";

import { CommentEditState } from "../../../../../@types/comment";
import { useCommentEditorStateSetter } from "../context";
import Button from "../../../../Common/Button";
import { deleteComment } from "../../../../../lib/firebaseSetup/firebaseApps";
import CommentOverlapWrapper from "./CommentOverlapWrapper";
import { useCommentDataContext } from "../../context";
import useEditable from "../../../../../lib/hook/useEditable";
import { useCommentPostTitleContext } from "../../../context";

type Props = {
  stateTo: CommentEditState;
};
const CheckPasswordState = ({ stateTo }: Props) => {
  const { changeStateTo } = useCommentEditorStateSetter();
  const postTitle = useCommentPostTitleContext();
  const { commentId, password } = useCommentDataContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [shakeToggle, setShakeToggle] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [
    inputPasswordRef,
    getPasswordVal,
    clearPasswordInput,
  ] = useEditable<HTMLInputElement>();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> =
    useCallback(
      async (event) => {
        event.preventDefault();

        const isPasswordCorrect =
          password === getPasswordVal();

        if (!isPasswordCorrect) {
          setShakeToggle((prev) => !prev);
          clearPasswordInput();
          return setErrorMessage("비밀번호가 틀렸습니다.");
        }

        if (stateTo === CommentEditState.DELETE) {
          setIsDeleting(true);
          await deleteComment({
            title: postTitle,
            commentId,
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
      ]
    );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputPasswordRef.current?.focus();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <CommentOverlapWrapper
      closer={<CommentOverlapWrapper.CloseButtonWithIcon />}
    >
      <Form onSubmit={handleFormSubmit}>
        <Label htmlFor="password">
          비밀번호를 입력해주세요.
        </Label>
        <InputWrapper>
          <Input
            ref={inputPasswordRef}
            id="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            required
          />
          <SubmitButton
            type="submit"
            width="40px"
            height="25px"
            isLoading={isDeleting}
          >
            입력
          </SubmitButton>
          {errorMessage && (
            <ErrorMessage shakeToggle={shakeToggle}>
              {errorMessage}
            </ErrorMessage>
          )}
        </InputWrapper>
      </Form>
    </CommentOverlapWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
`;

const Form = styled.form`
  position: relative;
  font-size: 0.9rem;
`;
const Label = styled.label`
  display: block;

  margin-bottom: 0.4rem;
`;
const Input = styled.input`
  border-radius: 5px;
  height: 25px;
  width: 200px;
  padding: 0 0.3rem;

  ${({ theme }) => css`
    border: 1px solid ${theme.subTextColor};

    font-family: ${theme.mainFont};
    color: ${theme.textColor};

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      -webkit-text-fill-color: ${theme.textColor} !important;
    }

    :focus {
      outline: 2px solid ${theme.accentColor};
      outline-offset: -3px;
    }
  `}
`;
const SubmitButton = styled(Button)`
  position: absolute;
  left: 205px;
`;

const keyframesShake = keyframes`
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(-10%);
  }
  75% {
    transform: translate(10%);
  }
  100% {
    transform: translate(0);
  }
`;
const keyframesShakRev = keyframes`
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(10%);
  }
  75% {
    transform: translate(-10%);
  }
  100% {
    transform: translate(0);
  }
`;
type ErrorMessageProps = { shakeToggle: boolean };
const ErrorMessage = styled.span<ErrorMessageProps>`
  display: inline-block;
  position: absolute;
  top: 29px;
  left: 0;

  color: red;
  font-size: 0.8rem;
  ${({ shakeToggle }) =>
    shakeToggle
      ? css`
          animation: ${keyframesShake} 0.2s;
        `
      : css`
          animation: ${keyframesShakRev} 0.2s reverse;
        `}
`;

export default CheckPasswordState;
