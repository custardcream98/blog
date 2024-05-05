import type { Metadata } from "next"

export const METADATA_DEFAULT_TITLE = "FE 개발자 박시우의 기술 블로그"

export const METADATA_DEFAULT_URL = new URL("https://shiwoo.dev")

export const METADATA_DEFAULT_KEYWORDS = ["HTML", "CSS", "JavaScript"]

export const METADATA_DEFAULT_DESCRIPTION =
  "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다."

export const METADATA_DEFAULT_IMAGE = {
  alt: METADATA_DEFAULT_TITLE,
  height: 630,
  url: "/static/img/thumbnail.webp",
  width: 1200,
}

export const sharedMetadata: Metadata = {
  description: METADATA_DEFAULT_DESCRIPTION,
  keywords: METADATA_DEFAULT_KEYWORDS,

  openGraph: {
    description: METADATA_DEFAULT_DESCRIPTION,
    images: METADATA_DEFAULT_IMAGE,
    type: "website",
  },

  twitter: {
    description: METADATA_DEFAULT_DESCRIPTION,
    images: METADATA_DEFAULT_IMAGE,
  },
}
