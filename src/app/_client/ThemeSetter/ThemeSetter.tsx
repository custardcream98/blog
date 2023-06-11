import useIsMounted from "src/hook/useIsMounted";
import { getIsDarkmodeActivatedOnLocal } from "src/lib/localStorage";

import { type PropsWithChildren, useEffect } from "react";

export function ThemeSetter({ children }: PropsWithChildren) {
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) return;

    const isDarkmodeActivatedOnLocal = getIsDarkmodeActivatedOnLocal();
    const $root = document.documentElement;

    if (isDarkmodeActivatedOnLocal) {
      $root.classList.add("dark");
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return <>{children}</>;
}
