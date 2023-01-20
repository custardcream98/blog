import { DefaultTheme } from "styled-components";

// TODO: 테마 관리 방법 리팩토링

const commonTheme = {
  footerShadow: "rgba(17, 17, 26, 0.1) 1px 0px 0px",

  mainColor: "#d7a306",
  mainGradient: "linear-gradient(90deg, #d7a306, #fbf2c8)",
  codingFont: '"Source Code Pro", monospace',
  mainFont:
    '"Noto Sans", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  titleFont: '"Poppins", sans-serif',
};

export const lightTheme: DefaultTheme = {
  ...commonTheme,

  bgColor: "#fcfcfc",
  textColor: "#121212",
  subTextColor: "rgb(140, 140, 140)",
  navLineShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
  navBackgroundColor: "#e7e7e767",

  postElementBackgroundColor: "rgb(230, 230, 230)",

  darkmodeShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  accentColor: "#0070f3",
};

export const darkTheme: DefaultTheme = {
  ...commonTheme,

  bgColor: "#121212",
  textColor: "#efefef",
  subTextColor: "rgb(177, 177, 177)",
  navLineShadow: "rgba(200, 200, 200, 0.25) 0px 1px 0px",
  navBackgroundColor: "#6a6a6a14",

  postElementBackgroundColor: "#1e1e1e",

  darkmodeShadow:
    "rgba(220, 205, 205, 0.25) 0px 2px 5px -1px, rgba(255, 255, 255, 0.3) 0px 1px 3px -1px",
  accentColor: "#3b96ff",
};
