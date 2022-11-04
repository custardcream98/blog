import { useEffect, useState } from "react";

/**
 * resize 이벤트 발생을 listen해 윈도우 사이즈 변경을 확인할 수 있도록 하는 커스텀 훅
 * @returns windowSize { width: number, height: number }
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ [key: string]: number | undefined }>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize(); // useEffect 첫 동작시 바로 확인

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
