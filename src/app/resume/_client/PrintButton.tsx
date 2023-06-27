import { useSetIsDarkmodeActivatedContext } from "src/app/_providers";
import { PrinterSvg } from "src/components/Svgs";

import { iconClickableStyle } from "../_components/ResumeLink";

import { useCallback } from "react";

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
      <PrinterSvg width='0.95rem' height='0.95rem' />
      프린트하기
    </button>
  );
}
