import PrintSvg from "src/components/Svgs/PrintSvg";
import SvgContainer from "src/components/Svgs/SvgContainer";
import { setIsDarkmodeActivatedOnLocal } from "src/lib/localStorage";

import { iconClickableStyle } from "../_components/ResumeLink";

import { useCallback } from "react";

export function PrintButton() {
  const handlePrint = useCallback(async () => {
    const $root = document.documentElement;
    const isDark = $root.classList.contains("dark");

    if (isDark) {
      $root.classList.remove("dark");
      setIsDarkmodeActivatedOnLocal(false);

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    window.print();
  }, []);

  return (
    <button type='button' onClick={handlePrint} className={iconClickableStyle}>
      <SvgContainer svgWidth='0.95rem' svgHeight='0.95rem'>
        <PrintSvg />
      </SvgContainer>
      프린트하기
    </button>
  );
}
