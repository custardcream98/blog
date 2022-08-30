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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
