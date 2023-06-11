import { getIsDarkmodeActivatedOnLocal, setIsDarkmodeActivatedOnLocal } from "src/lib/localStorage";

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type IsDarkmodeActivatedContext = {
  isDarkmodeActivated: boolean;
  setIsDarkmodeActivated: (isDarkmodeActivated: boolean) => void;
  setIsDarkmodeActivatedToggle: () => void;
  setIsDarkmodeActivatedTrue: () => void;
  setIsDarkmodeActivatedFalse: () => void;
};

const IsDarkmodeActivatedContext = createContext<IsDarkmodeActivatedContext>(
  null as unknown as IsDarkmodeActivatedContext,
);

export function useIsDarkmodeActivated() {
  const { isDarkmodeActivated } = useContext(IsDarkmodeActivatedContext);
  return isDarkmodeActivated;
}

export function useSetIsDarkmodeActivatedContext() {
  return useContext(IsDarkmodeActivatedContext);
}

export function IsDarkmodeActivatedContextProvider({ children }: PropsWithChildren) {
  const [isDarkmodeActivated, setIsDarkmodeActivated] = useState(true);
  const $root = useRef<HTMLElement | null>(null);

  const setIsDarkmodeActivatedToggle = useCallback((target?: boolean) => {
    setIsDarkmodeActivated((prev) => {
      const nextValue = typeof target === "boolean" ? target : !prev;

      console.log(nextValue);

      setIsDarkmodeActivatedOnLocal(nextValue);

      if (nextValue) {
        $root.current?.classList.add("dark");
      } else {
        $root.current?.classList.remove("dark");
      }

      return nextValue;
    });
  }, []);

  const setIsDarkmodeActivatedTrue = useCallback(() => {
    setIsDarkmodeActivatedToggle(true);
  }, [setIsDarkmodeActivatedToggle]);
  const setIsDarkmodeActivatedFalse = useCallback(() => {
    setIsDarkmodeActivatedToggle(false);
  }, [setIsDarkmodeActivatedToggle]);

  const isDarkmodeActivatedContextValue = useMemo(
    () => ({
      isDarkmodeActivated,
      setIsDarkmodeActivated,
      setIsDarkmodeActivatedFalse,
      setIsDarkmodeActivatedToggle,
      setIsDarkmodeActivatedTrue,
    }),
    [
      isDarkmodeActivated,
      setIsDarkmodeActivatedFalse,
      setIsDarkmodeActivatedToggle,
      setIsDarkmodeActivatedTrue,
    ],
  );

  useLayoutEffect(() => {
    const isDarkmodeActivatedOnLocal = getIsDarkmodeActivatedOnLocal();
    $root.current = document.documentElement;

    if (!isDarkmodeActivatedOnLocal) {
      $root.current.classList.remove("dark");
      setIsDarkmodeActivated(false);
    }
  }, []);

  return (
    <IsDarkmodeActivatedContext.Provider value={isDarkmodeActivatedContextValue}>
      {children}
    </IsDarkmodeActivatedContext.Provider>
  );
}
