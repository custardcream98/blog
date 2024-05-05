import { useEditable } from "src/hook"
import {
  usePatchPostCommentMutation,
  usePostAlertSWMutation,
  usePostPostCommentMutation,
} from "src/request"
import { type PatchPostCommentRequest, type PostPostCommentRequest } from "src/request/axios"
import { CommentEditState } from "src/types/comment"
import { getCurrentURL } from "src/utils"

import { useCommentEditorStateSetter } from "../Comments/CommentCard/CommentEditor/context"
import { useCommentDataContext } from "../Comments/CommentCard/context"
import { useCommentPostTitleContext } from "../Comments/CommentsSection.new"

import { useCallback } from "react"

export const useCommentForm = (isForEdit: boolean) => {
  const {
    commentId,
    username: initialUsername,
    password: initialPassword,
    comment: initialComment,
    updateCommentDataContext,
  } = useCommentDataContext()

  const [usernameRef, getUsername, clearUsername] = useEditable<HTMLInputElement>(initialUsername)
  const [passwordRef, getPassword, clearPassword] = useEditable<HTMLInputElement>(initialPassword)
  const [commentRef, getComment, clearComment] = useEditable<HTMLTextAreaElement>(initialComment)

  const getCommentFormData = useCallback(() => {
    const password = getPassword()
    const username = getUsername()
    const comment = getComment()

    if (!username || !password || !comment) {
      return
    }
    if (password.length <= 3) {
      return alert("비밀번호는 4자 이상 입력해주세요.")
    }

    return { comment, password, username }
  }, [getComment, getPassword, getUsername])

  const clearCommentForm = useCallback(() => {
    clearUsername()
    clearPassword()
    clearComment()
  }, [clearComment, clearPassword, clearUsername])

  const title = useCommentPostTitleContext()

  const { changeStateTo } = useCommentEditorStateSetter()
  const { mutateAsync: mutatePatchPostCommentAsync, isLoading: isPostCommentPatching } =
    usePatchPostCommentMutation()
  const handleUpdateComment = useCallback(
    async ({ comment, commentId, password, title, username }: PatchPostCommentRequest) => {
      try {
        await mutatePatchPostCommentAsync({
          comment,
          commentId,
          password,
          title,
          username,
        })

        updateCommentDataContext({
          comment,
          username,
        })
      } catch (error) {
        alert("댓글 수정중 오류가 발생했습니다.")
      }

      return changeStateTo(CommentEditState.DEFAULT)
    },
    [changeStateTo, updateCommentDataContext, mutatePatchPostCommentAsync],
  )

  const { mutateAsync: mutatePostPostCommentAsync, isLoading: isPostCommentPosting } =
    usePostPostCommentMutation()
  const { mutate: mutatePostAlertSW } = usePostAlertSWMutation()
  const handleAddComment = useCallback(
    async ({ comment, password, title, username }: PostPostCommentRequest) => {
      await mutatePostPostCommentAsync({
        comment,
        password,
        title,
        username,
      })

      const CURRENT_POST_URL = getCurrentURL()

      mutatePostAlertSW({ comment, linkToPost: CURRENT_POST_URL, postTitle: title, username })
    },
    [mutatePostPostCommentAsync, mutatePostAlertSW],
  )

  const isLoading = isPostCommentPatching || isPostCommentPosting

  const handleCommentSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const commentFormdata = getCommentFormData()
      if (!commentFormdata) {
        return
      }
      const { comment, password, username } = commentFormdata

      if (isForEdit) {
        return await handleUpdateComment({
          comment,
          commentId,
          password,
          title,
          username,
        })
      }

      await handleAddComment({
        comment,
        password,
        title,
        username,
      })

      clearCommentForm()
    },
    [
      title,
      commentId,
      clearCommentForm,
      getCommentFormData,
      isForEdit,
      handleUpdateComment,
      handleAddComment,
    ],
  )

  return {
    commentRef,
    handleCommentSubmit,
    isLoading,
    passwordRef,
    usernameRef,
  }
}
