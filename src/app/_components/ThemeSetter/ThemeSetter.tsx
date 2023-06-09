"use client";

import useIsMounted from "src/hook/useIsMounted";
import { getIsDarkmodeActivatedOnLocal } from "src/lib/localStorage";

import { type PropsWithChildren, useLayoutEffect } from "react";

export function ThemeSetter({ children }: PropsWithChildren): JSX.Element {
  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    const isDarkmodeActivatedOnLocal = getIsDarkmodeActivatedOnLocal();
    const $root = document.documentElement;

    if (isDarkmodeActivatedOnLocal) {
      $root.classList.add("dark");
    }
  }, []);

  if (!isMounted || !children) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return <>{children}</>;
}
