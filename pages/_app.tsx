import React from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";

import "@fontsource/noto-sans/300.css";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/700.css";
import "@fontsource/noto-sans/900.css";
import "@fontsource/noto-sans-kr/300.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/900.css";
import "@fontsource/nanum-myeongjo";
import "@fontsource/source-code-pro/800.css";
import "@fontsource/poppins/800.css";

import "../styles/reset.css";
import "../styles/font.css";

function MyApp({ Component, pageProps }: AppProps) {
  console.clear();

  console.log(
    "%c안녕하세요👋",
    "font-family: 'Noto Sans'; font-size: 16px; font-weight: 300"
  );

  console.log(
    "%c주니어 프론트엔드 개발자",
    "display: inline-block; font-family: 'Noto Sans'; font-size: 24px; font-weight: 800; color: #0938F0;"
  );

  console.log(
    "%c박시우입니다.",
    "display: inline-block; font-family: 'Noto Sans'; font-size: 24px; font-weight: 800; background-image: linear-gradient(to right, #0938F0, #03B8F4); color: #ffffff; padding: 6px 8px 2px 11px;"
  );

  console.log(
    "%c이력서 : https://custardcream98.github.io/resume/\n이메일 : custardcream@kakao.com",
    "font-family: 'Noto Sans'; font-size: 15px; font-weight: 500"
  );

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
