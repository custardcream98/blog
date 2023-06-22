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

const DARKMODE_CLASS_NAME = "dark";
export function IsDarkmodeActivatedContextProvider({ children }: PropsWithChildren) {
  const [isDarkmodeActivated, setIsDarkmodeActivated] = useState(true);
  const $root = useRef<HTMLElement | null>(null);

  const setIsDarkmodeActivatedOnRootElement = useCallback((isDarkmodeActivated: boolean) => {
    if (isDarkmodeActivated) {
      $root.current?.classList.add(DARKMODE_CLASS_NAME);
    } else {
      $root.current?.classList.remove(DARKMODE_CLASS_NAME);
    }
  }, []);

  const setIsDarkmodeActivatedToggle = useCallback(
    (target?: boolean) => {
      setIsDarkmodeActivated((prev) => {
        const nextValue = typeof target === "boolean" ? target : !prev;

        setIsDarkmodeActivatedOnLocal(nextValue);
        setIsDarkmodeActivatedOnRootElement(nextValue);

        return nextValue;
      });
    },
    [setIsDarkmodeActivatedOnRootElement],
  );

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
      setIsDarkmodeActivatedOnRootElement(false);
      setIsDarkmodeActivated(false);
    }
  }, [setIsDarkmodeActivatedOnRootElement]);

  return (
    <IsDarkmodeActivatedContext.Provider value={isDarkmodeActivatedContextValue}>
      {children}
    </IsDarkmodeActivatedContext.Provider>
  );
}
