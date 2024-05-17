import { ClientLogger, ProjectAd } from "src/components/client"
import { FONT_D2_CODING, FONT_POPPINS, FONT_PRETENDARD } from "src/fonts"

import { Navigation } from "./_client"
import { Footer } from "./_components"
import { RootProvider } from "./_providers"

import "./style.css"

import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
// import DevportImage from "public/static/ad/devport.png";
// import JarvisLogoImage from "public/static/ad/jarvis-logo.png";
import HantypeImage from "public/static/ad/hantype.png"
import { utld } from "utility-class-components"

export { metadata } from "./metadata"

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='ko' className='dark scroll-smooth'>
      <head>
        <link rel='icon' type='image/png' href='/static/icon.png' />
        {process.env.NODE_ENV === "production" && (
          <>
            <meta
              name='google-site-verification'
              content='uEQH_kf2TBUnEK9r0_FjuR-nICr97lyWeNkTlQJt1XI'
            />
            <meta
              name='naver-site-verification'
              content='f97b3212948a936aa8bb8d14b7f84ba8d01f9cc1'
            />
            <Script
              id='google-analytics-script'
              strategy='afterInteractive'
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
            />
            <Script id='google-analytics' strategy='afterInteractive'>
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`}
            </Script>
          </>
        )}
      </head>
      <Body>
        <RootProvider>
          <Navigation />
          <Wrapper>
            <Main>{children}</Main>
            <Footer />
          </Wrapper>
          {/* <ProjectAd
            projectName='이력서 기반 예상 면접 질문 생성기'
            projectLink='https://devport.swygbro.com/'
            repositoryLink='https://github.com/custardcream98/DevPort'
            projectImage={DevportImage}
          /> */}
          {/* <ProjectAd
            projectName={
              <>
                <span>이 프로젝트 뭐지? </span>
                <span className='ad:block'>Jarvis에게 물어보세요.</span>
              </>
            }
            repositoryLink='https://github.com/custardcream98/vscode-jarvis'
            projectImage={JarvisLogoImage}
          /> */}
          <ProjectAd
            projectName={
              <>
                <span>심플 한글 타자 연습 </span>
                <span className='ad:block'>한,타자</span>
              </>
            }
            projectLink='https://hantype.shiwoo.dev/'
            repositoryLink='https://github.com/custardcream98/han-type'
            projectImage={HantypeImage}
          />
        </RootProvider>
        <ClientLogger />
        <SpeedInsights />
      </Body>
    </html>
  )
}

const FONTS = [FONT_PRETENDARD.variable, FONT_POPPINS.variable, FONT_D2_CODING.variable]

const Body = utld.body`
  font-sans
  text-default-light
  dark:text-default-dark
  bg-bg-light
  dark:bg-bg-dark

  transition-all
  duration-100

  print:bg-transparent

  ${FONTS}
`

const Wrapper = utld.div`
  flex
  flex-col
  min-h-[calc(100vh-50px)]
`

const Main = utld.main`
  flex-1
  print:mt-[-2rem]
`
