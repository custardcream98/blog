import type { DefaultTheme } from "styled-components";

// TODO: 테마 관리 방법 리팩토링

const commonTheme = {
  codingFont: '"Source Code Pro", monospace',
  mainColor: "#d7a306",
  mainFont:
    '"Noto Sans", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  mainGradient: "linear-gradient(90deg, #d7a306, #fbf2c8)",
  titleFont: '"Poppins", sans-serif',
};

export const lightTheme: DefaultTheme = {
  ...commonTheme,

  accentColor: "#0070f3",
  bgColor: "#fcfcfc",
  darkmodeShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  navBackgroundColor: "#e7e7e767",
  navLineShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",

  postElementBackgroundColor: "rgb(240, 240, 240)",

  resumeAccentColor: "#ffbb00",
  resumeBadgeBackgroundColor: "#eee",

  resumeBadgeTextColor: "#666",
  resumeDimTextColor: "#aaa",
  resumeStrongTextColor: "#333",
  resumeTextColor: "#616161",
  subTextColor: "rgb(140, 140, 140)",
  textColor: "#121212",
};

export const darkTheme: DefaultTheme = {
  ...commonTheme,

  accentColor: "#3b96ff",
  bgColor: "#121212",
  darkmodeShadow:
    "rgba(220, 205, 205, 0.25) 0px 2px 5px -1px, rgba(255, 255, 255, 0.3) 0px 1px 3px -1px",
  navBackgroundColor: "#6a6a6a14",
  navLineShadow: "rgba(200, 200, 200, 0.25) 0px 1px 0px",

  postElementBackgroundColor: "#1e1e1e",

  resumeAccentColor: "#ffea00",
  resumeBadgeBackgroundColor: "#ffffff22",

  resumeBadgeTextColor: "#ffffff99",
  resumeDimTextColor: "#858585",
  resumeStrongTextColor: "#fff",
  resumeTextColor: "#ccc",
  subTextColor: "rgb(177, 177, 177)",
  textColor: "#efefef",
};
