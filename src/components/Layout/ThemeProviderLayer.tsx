import { isDarkAtom } from "src/lib/atoms";
import useIsMounted from "src/lib/hook/useIsMounted";
import { getIsDarkmodeActivatedOnLocal } from "src/lib/localStorage";
import { darkTheme, lightTheme } from "src/lib/theme";

import { type PropsWithChildren, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
      font-family: "Noto Sans", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      background-color: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.textColor};
 
      /*
        다크모드 transition
      */
      transition: all 0.1s linear;

      @media only print {
        background-color: transparent;
      }
  }
  html {
    scroll-behavior: smooth;
  }
`;

function ThemeProviderLayer({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    setIsDark(getIsDarkmodeActivatedOnLocal());
  }, [setIsDark]);

  const body = (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );

  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
}

export default ThemeProviderLayer;
