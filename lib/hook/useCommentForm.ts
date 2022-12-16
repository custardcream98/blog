import { useCallback, useRef, useState } from "react";
import { postMail } from "../axios";
import { addComment } from "../firebaseSetup/firebaseApps";
import useEditable from "./useEditable";

const useCommentForm = (title: string) => {
  const [usernameRef, getUsername, clearUsername] =
    useEditable<HTMLInputElement>();

  const [passwordRef, getPassword, clearPassword] =
    useEditable<HTMLInputElement>();

  const [commentRef, getComment, clearComment] =
    useEditable<HTMLTextAreaElement>();

  const [isLoading, setIsLoading] = useState(false);

  const handleCommentSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsLoading(true);

      const username = getUsername();
      const password = getPassword();
      const comment = getComment();

      if (
        !username ||
        !password ||
        !comment ||
        (password && password.length <= 4)
      ) {
        setIsLoading(false);
        return;
      }

      await addComment({
        title,
        password,
        comment,
        username,
      });

      postMail(title, username, comment);

      clearUsername();
      clearPassword();
      clearComment();

      setIsLoading(false);
    },
    [title]
  );

  return {
    usernameRef,
    passwordRef,
    commentRef,
    isLoading,
    handleCommentSubmit,
  };
};

export default useCommentForm;
