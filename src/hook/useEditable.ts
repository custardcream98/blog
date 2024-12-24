import { useCallback, useLayoutEffect, useRef } from "react"

export const useEditable = <T extends HTMLInputElement | HTMLTextAreaElement>(
  initialValue?: string,
): [React.RefObject<T | null>, () => string | undefined, () => void] => {
  const editableRef = useRef<T>(null)
  useLayoutEffect(() => {
    if (!editableRef.current || !initialValue) return

    editableRef.current.value = initialValue
  }, [initialValue])

  const getEditableVal = useCallback(() => editableRef.current?.value, [])
  const clearEditableVal = useCallback(() => {
    if (!editableRef.current) return

    editableRef.current.value = ""
  }, [])

  return [editableRef, getEditableVal, clearEditableVal]
}
