import { useEffect, useState } from "react";

/**
 * 컴포넌트 mount 여부를 확인하는 커스텀 hook
 */
export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
  }, []);

  return mounted;
};
