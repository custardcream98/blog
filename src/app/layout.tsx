import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"

import Script from "next/script"

import { FONT_D2_CODING, FONT_PRETENDARD } from "@/assets/font"
import { Footer } from "@/domains/main/components/Footer"
import { GlobalNavigation } from "@/domains/main/components/GlobalNavigation"
import { cn } from "@/utils/cn"

export { metadata } from "./metadata"

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html className={cn(FONTS, "scroll-smooth")} lang='ko'>
      <head>
        <link href='/static/icon.png' rel='icon' type='image/png' />
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              id='google-analytics-script'
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              strategy='afterInteractive'
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
      <body
        className={cn(
          "bg-background text-foreground flex min-h-screen flex-col font-sans",
          "px-4 lg:mx-auto lg:w-200 lg:px-0",
        )}
      >
        <GlobalNavigation />
        <main className='w-full flex-1'>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}

const FONTS = [
  FONT_PRETENDARD.variable,
  // FONT_POPPINS.variable,
  FONT_D2_CODING.variable,
]
