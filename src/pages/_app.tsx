import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";

import ThemeProviderLayer from "src/components/Layout/ThemeProviderLayer";
import Layout from "src/components/Layout/Layout";
import ProjectAd from "src/components/Common/ProjectAd";

import DevportImage from "public/static/ad/devport.png";

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
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import "../styles/reset.css";
import "../styles/font.css";
import "../styles/style.css";

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
    "%c이력서 : https://shiwoo.dev/resume/\n이메일 : custardcream@kakao.com",
    "font-family: 'Noto Sans'; font-size: 15px; font-weight: 500"
  );

  return (
    <RecoilRoot>
      <ThemeProviderLayer>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ProjectAd
          projectName="이력서 기반 예상 면접 질문 생성기"
          projectLink="https://devport.swygbro.com/"
          repositoryLink="https://github.com/custardcream98/DevPort"
          projectImage={DevportImage}
        />
      </ThemeProviderLayer>
    </RecoilRoot>
  );
}

export default MyApp;
