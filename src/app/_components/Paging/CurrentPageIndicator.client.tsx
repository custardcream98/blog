"use client";

import { useIsMobile } from "src/hook";

import { useMemo } from "react";
import { utld } from "utility-class-components";

type CurrentPageIndicatorProps = {
  position?: number;
};

export function CurrentPageIndicator({ position = 1 }: CurrentPageIndicatorProps) {
  const isMobile = useIsMobile();
  const indicatorStyle = useMemo(() => {
    const indicatorWidthWithMargin = isMobile ? 1.7 : 2;
    const currentIndicatorLocation = (position - 1) * indicatorWidthWithMargin;

    return {
      transform: `translateX(${currentIndicatorLocation}rem)`,
    };
  }, [position, isMobile]);

  return <Indicator style={indicatorStyle} />;
}

const Indicator = utld.div`
  absolute
  w-6
  h-6
  left-1
  mobile:left-[0.1rem]
  -z-10

  bg-accent-light
  dark:bg-accent-dark

  rounded

  transition-transform
  duration-500
`;
