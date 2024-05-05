import { Button } from "src/components/client"
import { useEditable } from "src/hook"
import { useDeletePostCommentMutation, usePostPostCommentPassword } from "src/request"
import { CommentEditState } from "src/types/comment"

import { useCommentPostTitleContext } from "../../../CommentsSection.new"
import { useCommentDataContext } from "../../context"
import { useCommentEditorStateSetter } from "../context"

import CommentOverlapWrapper from "./CommentOverlapWrapper"

import { useIsMutating } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { utld } from "utility-class-components"

type Props = {
  stateTo: CommentEditState
}
export default function CheckPasswordState({ stateTo }: Props) {
  const { changeStateTo } = useCommentEditorStateSetter()
  const postTitle = useCommentPostTitleContext()
  const { commentId, initializePassword } = useCommentDataContext()
  const [errorMessage, setErrorMessage] = useState("")
  const [isAnimatingShake, setIsAnimatingShake] = useState(false)
  const handleShakeAnimationStart = useCallback(() => {
    setIsAnimatingShake(true)
  }, [])
  const handleShakeAnimationEnd = useCallback(() => {
    setIsAnimatingShake(false)
  }, [])

  const [inputPasswordRef, getPasswordVal, clearPasswordInput] = useEditable<HTMLInputElement>()

  const { mutate: mutateDeletePostComment } = useDeletePostCommentMutation()

  const { mutateAsync: mutatePostPostCommentPassword } = usePostPostCommentPassword()

  const mutationCount = useIsMutating()
  const isMutating = mutationCount > 0

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault()

      const inputPasswordValue = getPasswordVal()

      if (!inputPasswordValue) {
        return
      }

      const { isValid: isPasswordCorrect } = await mutatePostPostCommentPassword({
        commentId,
        password: inputPasswordValue,
        postTitle,
      })

      if (!isPasswordCorrect) {
        handleShakeAnimationStart()
        clearPasswordInput()
        return setErrorMessage("비밀번호가 틀렸습니다.")
      }

      if (stateTo === CommentEditState.DELETE) {
        mutateDeletePostComment({
          commentId,
          password: inputPasswordValue,
          title: postTitle,
        })

        return
      }

      initializePassword(inputPasswordValue)

      return changeStateTo(stateTo)
    },
    [
      getPasswordVal,
      clearPasswordInput,
      stateTo,
      changeStateTo,
      commentId,
      postTitle,
      handleShakeAnimationStart,
      mutateDeletePostComment,
      mutatePostPostCommentPassword,
      initializePassword,
    ],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputPasswordRef.current?.focus()
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [inputPasswordRef])

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
          <SubmitButton type='submit' width='40px' height='25px' isLoading={isMutating}>
            입력
          </SubmitButton>
          {errorMessage && (
            <ErrorMessage
              $isAnimatingShake={isAnimatingShake}
              onAnimationEnd={handleShakeAnimationEnd}
            >
              {errorMessage}
            </ErrorMessage>
          )}
        </InputWrapper>
      </Form>
    </CommentOverlapWrapper>
  )
}

const InputWrapper = utld.div`
  relative
`

const Form = utld.form`
  relative
  text-[0.9rem]
`
const Label = utld.label`
  block

  mb-[0.4rem]
`
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
`

const SubmitButton = utld(Button)`
  absolute
  left-[12.8125rem]
`

type ErrorMessageProps = { $isAnimatingShake: boolean }

const ErrorMessage = utld.span<ErrorMessageProps>`
  absolute
  top-[1.8125rem]
  left-0

  text-red-500
  text-[0.8rem]

  ${({ $isAnimatingShake }) => $isAnimatingShake && "animate-shake"}
`
