import "@fontsource/nanum-myeongjo";

import ProjectAd from "src/components/Common/ProjectAd";

import { Footer, Navigation, ThemeSetter } from "./_components";
import { sharedMetadata } from "./sharedMetadata";

import "@fontsource/noto-sans/300.css";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/700.css";
import "@fontsource/noto-sans/900.css";
import "@fontsource/noto-sans-kr/300.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/900.css";
import "@fontsource/source-code-pro/800.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "src/styles/font.css";
import "src/styles/print.css";
import "src/styles/tailwind.css";
import "src/styles/post.css";

import { type Metadata } from "next";
import Script from "next/script";
import DevportImage from "public/static/ad/devport.png";
import { type PropsWithChildren } from "react";
import { utld } from "utility-class-components";

const DEFAULT_TITLE = "FE 개발자 박시우의 기술 블로그";
const DEFAULT_URL = new URL("https://shiwoo.dev");

export const metadata: Metadata = {
  ...sharedMetadata,

  metadataBase: DEFAULT_URL,

  openGraph: {
    ...sharedMetadata.openGraph,
    locale: "ko_KR",
    siteName: DEFAULT_TITLE,
    title: {
      default: DEFAULT_TITLE,
      template: `${DEFAULT_TITLE}: %s`,
    },
  },

  title: {
    default: DEFAULT_TITLE,
    template: `${DEFAULT_TITLE}: %s`,
  },

  twitter: {
    ...sharedMetadata.twitter,
    card: "summary_large_image",
    creator: "@ova_sw",
    site: "@ova_sw",
    title: {
      default: DEFAULT_TITLE,
      template: `${DEFAULT_TITLE}: %s`,
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  console.clear();

  console.log("%c안녕하세요👋", "font-family: 'Noto Sans'; font-size: 16px; font-weight: 300");

  console.log(
    "%c주니어 프론트엔드 개발자",
    "display: inline-block; font-family: 'Noto Sans'; font-size: 24px; font-weight: 800; color: #0938F0;",
  );

  console.log(
    "%c박시우입니다.",
    "display: inline-block; font-family: 'Noto Sans'; font-size: 24px; font-weight: 800; background-image: linear-gradient(to right, #0938F0, #03B8F4); color: #ffffff; padding: 6px 8px 2px 11px;",
  );

  console.log(
    "%c이력서 : https://shiwoo.dev/resume/\n이메일 : custardcream@kakao.com",
    "font-family: 'Noto Sans'; font-size: 15px; font-weight: 500",
  );

  return (
    <html lang='ko' className='scroll-smooth'>
      <head>
        <link rel='icon' type='image/png' href='../static/icon.png' />
        <meta
          name='google-site-verification'
          content='uEQH_kf2TBUnEK9r0_FjuR-nICr97lyWeNkTlQJt1XI'
        />
        <meta name='naver-site-verification' content='f97b3212948a936aa8bb8d14b7f84ba8d01f9cc1' />
        {
          // 구글 Analytics
        }
        <Script
          strategy='afterInteractive'
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`}
        </Script>
      </head>
      <Body>
        <ThemeSetter>
          <Navigation />
          <Wrapper>
            <Main>{children}</Main>
            <Footer />
          </Wrapper>
          <ProjectAd
            projectName='이력서 기반 예상 면접 질문 생성기'
            projectLink='https://devport.swygbro.com/'
            repositoryLink='https://github.com/custardcream98/DevPort'
            projectImage={DevportImage}
          />
        </ThemeSetter>
      </Body>
    </html>
  );
}

const Body = utld.body`
  font-sans
  text-default-light
  dark:text-default-dark
  bg-bg-light
  dark:bg-bg-dark

  transition-all
  duration-100

  print:bg-transparent
`;

const Wrapper = utld.div`
  flex
  flex-col
  min-h-[calc(100vh-50px)]
`;

const Main = utld.main`
  flex-1
  print:mt-[-2rem]
`;
