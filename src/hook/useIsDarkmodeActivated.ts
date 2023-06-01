import useClassMutationObserver from "./useClassMutationObserver";

import { useCallback, useEffect, useRef, useState } from "react";

const useIsDarkmodeActivated = () => {
  const rootElementRef = useRef<HTMLElement | null>(null);
  const [isDarkmodeActivated, setIsDarkmodeActivated] = useState(false);

  useEffect(() => {
    rootElementRef.current = document.documentElement;
  }, []);

  const handleDarkmodeChange = useCallback((currentState: boolean) => {
    setIsDarkmodeActivated(currentState);
  }, []);

  useClassMutationObserver(rootElementRef, "dark", handleDarkmodeChange);

  return isDarkmodeActivated;
};

export default useIsDarkmodeActivated;
