import "./globals.css"
import "./font.css"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"

import { ToastProvider } from "@/components/ToastProvider"

export { metadata } from "./metadata"

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      className='scroll-smooth'
      data-scroll-behavior='smooth' // https://nextjs.org/docs/messages/missing-data-scroll-behavior
      lang='ko'
    >
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
      <body className='bg-background text-foreground flex min-h-screen flex-col font-sans'>
        <div className='w-full flex-1'>{children}</div>
        <ToastProvider />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
