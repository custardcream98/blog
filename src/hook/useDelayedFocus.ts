import { useCallback } from "react";

const DEFAULT_DURATION = 200;

export const useDelayedFocus = (
  ref: React.RefObject<HTMLElement>,
  delayInMs = DEFAULT_DURATION,
) => {
  const focus = useCallback(() => {
    const focusTimeout = setTimeout(() => ref.current?.focus(), delayInMs);
    return () => clearTimeout(focusTimeout);
  }, [ref, delayInMs]);

  return focus;
};
