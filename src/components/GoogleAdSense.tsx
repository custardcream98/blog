import Script from "next/script"

export const GoogleAdSense = () => {
  return (
    <Script
      async
      src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4667183889852511'
      strategy='lazyOnload'
      crossOrigin='anonymous'
    />
  )
}
