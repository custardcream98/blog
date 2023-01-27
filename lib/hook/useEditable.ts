import { useRef } from "react";
import type { RefObject } from "react";

const useEditable = <
  T extends HTMLInputElement | HTMLTextAreaElement
>(): [
  RefObject<T>,
  () => string | undefined,
  () => void
] => {
  const editableRef = useRef<T>(null);

  const getEditableVal = () => editableRef.current?.value;
  const clearEditableVal = () => {
    editableRef.current!.value = "";
  };

  return [editableRef, getEditableVal, clearEditableVal];
};

export default useEditable;
