import { type RefObject, useRef } from "react";

const useEditable = <T extends HTMLInputElement | HTMLTextAreaElement>(): [
  RefObject<T>,
  () => string | undefined,
  () => void,
] => {
  const editableRef = useRef<T>(null);

  const getEditableVal = () => editableRef.current?.value;
  const clearEditableVal = () => {
    if (!editableRef.current) return;

    editableRef.current.value = "";
  };

  return [editableRef, getEditableVal, clearEditableVal];
};

export default useEditable;
