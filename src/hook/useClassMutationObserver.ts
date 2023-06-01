import React, { useEffect, useRef } from "react";

export type ClassMutationCallback = (isCurrentlyHasTargetClass: boolean) => void;

const useClassMutationObserver = (
  targetElementRef: React.RefObject<HTMLElement | null>,
  targetClass: string,
  callback: ClassMutationCallback,
) => {
  const prevClassStateRef = useRef<boolean>(false);

  useEffect(() => {
    if (!targetElementRef.current) return;

    const $target = targetElementRef.current;

    prevClassStateRef.current = $target.classList.contains(targetClass);

    callback(prevClassStateRef.current);

    const observer = new MutationObserver(() => {
      const currentClassState = $target.classList.contains(targetClass);

      if (prevClassStateRef.current !== currentClassState) {
        callback(currentClassState);
        prevClassStateRef.current = currentClassState;
      }
    });

    observer.observe($target, {
      attributeFilter: ["class"],
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [targetElementRef, targetClass, callback]);
};

export default useClassMutationObserver;
