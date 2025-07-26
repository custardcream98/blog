import { type Metadata } from "next"

import { sharedMetadata } from "../sharedMetadata"

const META_TITLE = "프론트엔드 개발자 박시우"
const META_DESCRIPTION = "Done is better than perfect 를 모토로 삼고 있습니다."

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
