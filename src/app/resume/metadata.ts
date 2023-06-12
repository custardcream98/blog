import { sharedMetadata } from "../sharedMetadata";

import { type Metadata } from "next";

const META_TITLE = "개발자 박시우 이력서";
const META_DESCRIPTION =
  "안녕하세요, 삽질 좋아하는 개발자 박시우입니다. 문제가 생기면 밤을 새서라도 알아내고 해결합니다.";

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
};
