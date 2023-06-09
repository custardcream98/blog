import { Button } from "src/components";
import useCommentForm from "src/hook/useCommentForm";

import { useCallback, useState } from "react";
import { ud, utld } from "utility-class-components";

type Props = {
  height?: string;
  isForEdit?: boolean;
};
export default function CommentForm({ height, isForEdit = false }: Props) {
  const { usernameRef, passwordRef, commentRef, isLoading, handleCommentSubmit } =
    useCommentForm(isForEdit);

  return (
    <StyledForm
      style={{
        height: height,
      }}
      onSubmit={handleCommentSubmit}
    >
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
        style={{
          height: height ? "calc(100% - 31px)" : "117px",
        }}
        ref={commentRef}
        id='textarea-comment'
        placeholder='댓글을 입력해주세요.'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        required
      />
      <SubmitCommentButton type='submit' width='70px' height='30px' isLoading={isLoading}>
        {isForEdit ? "수정하기" : "댓글 달기"}
      </SubmitCommentButton>
    </StyledForm>
  );
}

export function CommentFormWithOpenButton() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const openCommentForm = useCallback(() => setIsFormOpened(true), []);

  if (!isFormOpened) {
    return (
      <FormOpenButton type='button' onClick={openCommentForm}>
        댓글을 입력해주세요.
      </FormOpenButton>
    );
  }

  return <CommentForm />;
}

const roundedBoxStyle = ud`
  border
  border-solid
  border-default-sub-light
  dark:border-default-sub-dark
  text-default-light
  dark:text-default-dark

  rounded-[0.3125rem]
`;

const StyledForm = utld.form`
  relative

  w-full

  overflow-hidden

  bg-default-sub-light
  dark:bg-default-sub-dark

  ${roundedBoxStyle}
`;

const FormOpenButton = utld.button`
  w-full
  h-[3.125rem]
  font-sans
  font-light

  ${roundedBoxStyle}
`;

const editableStyle = ud`
  p-2

  text-[0.8rem]
  placeholder:text-[0.8rem]
  placeholder:font-medium

  font-sans
  bg-bg-light
  text-default-light

  dark:(
    bg-bg-dark
    text-default-dark
  )
`;

const InputUsername = utld.input`
  w-[calc(50%-0.03125rem)]
  h-[1.875rem]

  ${editableStyle}
`;

const InputPassword = utld(InputUsername)`
  ml-[1px]
`;

const TextareaContent = utld.textarea`
  block
  mt-[1px]
  w-full

  resize-none

  text-[0.9rem]
  leading-[1.4]
  font-light

  mobile:text-[0.8rem]

  ${editableStyle}
`;

const SubmitCommentButton = utld(Button)`
  absolute

  right-[0.3125rem]
  bottom-[0.3125rem]

  text-[0.9rem]
`;
