import { Metadata } from "next"

import { sharedMetadata } from "@/app/_sharedMetadata"

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "shiwoo.dev: 스크랩",
  description: "재밌게 읽은 것들을 스크랩합니다.",
  openGraph: {
    ...sharedMetadata.openGraph,
    description: "재밌게 읽은 것들을 스크랩합니다.",
  },
  twitter: {
    ...sharedMetadata.twitter,
    description: "재밌게 읽은 것들을 스크랩합니다.",
  },
}
