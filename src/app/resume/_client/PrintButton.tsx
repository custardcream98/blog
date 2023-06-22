import { useSetIsDarkmodeActivatedContext } from "src/app/_providers";
import PrintSvg from "src/components/Svgs/PrintSvg";
import SvgContainer from "src/components/Svgs/SvgContainer";

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
      <SvgContainer svgWidth='0.95rem' svgHeight='0.95rem'>
        <PrintSvg />
      </SvgContainer>
      프린트하기
    </button>
  );
}
