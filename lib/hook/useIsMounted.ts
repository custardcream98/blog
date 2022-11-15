import { useEffect, useState } from "react";

/**
 * 컴포넌트 mount 여부를 확인하는 커스텀 hook
 */
export default () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
