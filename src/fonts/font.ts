import { Poppins, Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";

export const FONT_SOURCE_CODE_PRO = Source_Code_Pro({
  display: "swap",
  fallback: ["monospace"],
  preload: true,
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  weight: ["800"],
});

export const FONT_POPPINS = Poppins({
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["500", "600"],
});

export const FONT_NOTO_SANS_KR = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Apple Color Emoji",
    "Segoe UI Emoji",
  ],
  src: [
    {
      path: "./NotoSansKR/NotoSansKR-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "./NotoSansKR/NotoSansKR-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./NotoSansKR/NotoSansKR-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./NotoSansKR/NotoSansKR-Black.woff2",
      style: "normal",
      weight: "900",
    },
  ],
  variable: "--font-noto-sans-kr",
});

export const FONT_NOTO_SERIF_KR = localFont({
  adjustFontFallback: "Times New Roman",
  display: "swap",
  fallback: ["serif"],
  preload: true,
  src: [
    {
      path: "./NotoSerifKR/NotoSerifKR-Regular.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-noto-serif-kr",
});

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
