import {
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

type WindowSize = {
  width: number;
  height: number;
};
/**
 * resize 이벤트 발생을 listen해 윈도우 사이즈 변경을 확인할 수 있도록 하는 커스텀 훅
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize(); // useEffect 첫 동작시 바로 확인

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
