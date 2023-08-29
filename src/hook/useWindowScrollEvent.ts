import { useEffect } from "react";

export const useWindowScrollEvent = ({
  onScroll,
  disabled = false,
}: {
  onScroll: (ev: Event | TouchEvent) => any;
  disabled?: boolean;
}) => {
  useEffect(() => {
    if (disabled) {
      return;
    }

    window.addEventListener("touchmove", onScroll);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll, disabled]);
};
