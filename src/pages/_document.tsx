import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { utld } from "utility-class-components";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ko' className='scroll-smooth'>
        <Head>
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
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
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
