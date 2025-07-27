import { type Metadata } from "next"

import { sharedMetadata } from "@/app/sharedMetadata"

const META_TITLE = "개발자 박시우 이력서"
const META_DESCRIPTION = "프론트엔드 개발자 박시우의 이력서입니다."

export const metadata: Metadata = {
  ...sharedMetadata,

  description: META_DESCRIPTION,

  openGraph: {
    ...sharedMetadata.openGraph,
    description: META_DESCRIPTION,
    title: META_TITLE,
    url: "/resume",
  },

  title: META_TITLE,

  twitter: {
    ...sharedMetadata.twitter,
    description: META_DESCRIPTION,
    title: META_TITLE,
  },
}
