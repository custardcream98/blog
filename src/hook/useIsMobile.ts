import { useWindowSize } from "./useWindowSize";

const MOBILE_BREAKPOINT = 800; // px

export const useIsMobile = () => {
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_BREAKPOINT;

  return isMobile;
};
