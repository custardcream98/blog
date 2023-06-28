import { type RefObject, useCallback } from "react";

const DEFAULT_DURATION = 200;

export const useDelayedFocus = (ref: RefObject<HTMLElement>, delayInMs = DEFAULT_DURATION) => {
  const focus = useCallback(() => {
    const focusTimeout = setTimeout(() => ref.current?.focus(), delayInMs);
    return () => clearTimeout(focusTimeout);
  }, [ref, delayInMs]);

  return focus;
};
