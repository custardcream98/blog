import useEditable from "src/hook/useEditable";
import {
  addComment,
  type AddCommentProps,
  updateComment,
  type UpdateCommentProps,
} from "src/lib/firebaseSetup/firebaseApps";
import { usePostAlertSWMutation } from "src/request";
import { CommentEditState } from "src/types/comment";

import { useCommentEditorStateSetter } from "../Comments/CommentCard/CommentEditor/context";
import { useCommentDataContext } from "../Comments/CommentCard/context";
import { useCommentPostTitleContext } from "../Comments/context";

import { useCallback, useState } from "react";

export const useCommentForm = (isForEdit: boolean) => {
  const {
    commentId,
    username: initialUsername,
    password: initialPassword,
    comment: initialComment,
    updateCommentData,
  } = useCommentDataContext();

  const [usernameRef, getUsername, clearUsername] = useEditable<HTMLInputElement>(initialUsername);
  const [passwordRef, getPassword, clearPassword] = useEditable<HTMLInputElement>(initialPassword);
  const [commentRef, getComment, clearComment] = useEditable<HTMLTextAreaElement>(initialComment);

  const getCommentFormData = useCallback(() => {
    const password = getPassword();
    const username = getUsername();
    const comment = getComment();

    if (!username || !password || !comment) {
      return;
    }
    if (password.length <= 3) {
      return alert("비밀번호는 4자 이상 입력해주세요.");
    }

    return { comment, password, username };
  }, [getComment, getPassword, getUsername]);

  const clearCommentForm = useCallback(() => {
    clearUsername();
    clearPassword();
    clearComment();
  }, [clearComment, clearPassword, clearUsername]);

  const title = useCommentPostTitleContext();

  const { changeStateTo } = useCommentEditorStateSetter();
  const handleUpdateComment = useCallback(
    async ({ comment, commentId, password, title, username }: UpdateCommentProps) => {
      try {
        await updateComment({
          comment,
          commentId,
          password,
          title,
          username,
        });

        updateCommentData({
          comment,
          password,
          username,
        });
      } catch (error) {
        alert("댓글 수정중 오류가 발생했습니다.");
      }

      return changeStateTo(CommentEditState.DEFAULT);
    },
    [changeStateTo, updateCommentData],
  );

  const { mutate: mutatePostAlertSW } = usePostAlertSWMutation();
  const handleAddComment = useCallback(
    async ({ comment, password, title, username }: AddCommentProps) => {
      try {
        await addComment({
          comment,
          password,
          title,
          username,
        });
        mutatePostAlertSW({ comment, postTitle: title, username });
      } catch (error) {
        console.error(error);
        alert("댓글 등록중 오류가 발생했습니다.");
      }
    },
    [mutatePostAlertSW],
  );

  const [isLoading, setIsLoading] = useState(false);
  const handleCommentSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsLoading(true);

      const commentFormdata = getCommentFormData();
      if (!commentFormdata) {
        return setIsLoading(false);
      }
      const { comment, password, username } = commentFormdata;

      if (isForEdit) {
        return await handleUpdateComment({
          comment,
          commentId,
          password,
          title,
          username,
        });
      }

      await handleAddComment({
        comment,
        password,
        title,
        username,
      });

      clearCommentForm();

      setIsLoading(false);
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
  );

  return {
    commentRef,
    handleCommentSubmit,
    isLoading,
    passwordRef,
    usernameRef,
  };
};
