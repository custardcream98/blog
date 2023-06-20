import localFont from "next/font/local";

export const FONT_D2_CODING = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  fallback: ["monospace"],
  src: [
    {
      path: "./D2Coding/d2coding-subset.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-d2-coding",
});
