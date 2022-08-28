import React from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";

import "@fontsource/noto-sans";
import "@fontsource/noto-sans-kr";
import "@fontsource/nanum-myeongjo";
import "@fontsource/source-code-pro/800.css";
import "@fontsource/poppins/800.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
