import { useSetIsDarkmodeActivatedContext } from "src/app/_providers";
import { PrinterSvg } from "src/components/Svgs";

import { useCallback } from "react";
import { ud } from "utility-class-components";

export function PrintButton() {
  const { isDarkmodeActivated, setIsDarkmodeActivatedFalse } = useSetIsDarkmodeActivatedContext();

  const handlePrint = useCallback(async () => {
    if (isDarkmodeActivated) {
      setIsDarkmodeActivatedFalse();

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    window.print();
  }, [isDarkmodeActivated, setIsDarkmodeActivatedFalse]);

  return (
    <button type='button' onClick={handlePrint} className={iconClickableStyle}>
      <PrinterSvg />
      프린트하기
    </button>
  );
}

const iconClickableStyle = ud`
  text-[0.9em]
  font-light

  border-t-[0]
  border-r-[0]
  border-l-[0]
  border-b
  border-solid
  border-resume-text-light
  dark:border-resume-text-dark
  break-keep

  transition-colors
  ease-in-out
  duration-200

  [&>span]:mr-[0.2em]

  [&_svg]:(
    inline-block
    mr-1
    fill-resume-text-light
    dark:fill-resume-text-dark
    transition-[fill]
    ease-in-out
    duration-200
    hover:fill-resume-accent-light
    dark:hover:fill-resume-accent-dark

    w-[0.95em]
    h-[0.95em]
  )

  hover:(
    text-resume-accent-light
    dark:text-resume-accent-dark

    border-resume-accent-light
    dark:border-resume-accent-dark
  )
`;
