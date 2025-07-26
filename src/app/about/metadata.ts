import { type Metadata } from "next"

import { sharedMetadata } from "../sharedMetadata"

const META_TITLE = "소개 - 프론트엔드 개발자 박시우"
const META_DESCRIPTION =
  "안녕하세요! 동료와 함께 성장하며 사용자 경험을 개선하는 프론트엔드 개발자 박시우입니다."

export const metadata: Metadata = {
  ...sharedMetadata,

  description: META_DESCRIPTION,

  openGraph: {
    ...sharedMetadata.openGraph,
    description: META_DESCRIPTION,
    title: META_TITLE,
    url: "/about",
  },

  title: META_TITLE,

  twitter: {
    ...sharedMetadata.twitter,
    description: META_DESCRIPTION,
    title: META_TITLE,
  },
}
