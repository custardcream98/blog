"use client";

import { getIsDarkmodeActivatedOnLocal } from "src/lib/localStorage";

import { type PropsWithChildren, useEffect } from "react";

export function ThemeSetter({ children }: PropsWithChildren): JSX.Element {
  useEffect(() => {
    const isDarkmodeActivatedOnLocal = getIsDarkmodeActivatedOnLocal();
    const $root = document.documentElement;

    if (isDarkmodeActivatedOnLocal) {
      $root.classList.add("dark");
    }
  }, []);

  return <>{children}</>;
}
