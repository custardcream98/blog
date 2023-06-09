import { HeroPostsSection, Intro } from "./_components";

import type { Metadata } from "next";

const DEFAULT_KEYWORDS = ["HTML", "CSS", "JavaScript"];
const DEFAULT_DESCRIPTION =
  "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다.";
const DEFAULT_URL = "https://shiwoo.dev";
const DEFAULT_IMAGE = DEFAULT_URL + "/static/img/thumbnail.webp";
const DEFAULT_TITLE = "FE 개발자 박시우의 기술 블로그";

export const metadata: Metadata = {
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  openGraph: {
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        alt: DEFAULT_TITLE,
        height: 1036,
        url: DEFAULT_IMAGE,
        width: 1556,
      },
    ],
    locale: "ko_KR",
    siteName: DEFAULT_TITLE,
    title: {
      default: DEFAULT_TITLE,
      template: `${DEFAULT_TITLE}: %s`,
    },
    type: "website",
    url: DEFAULT_URL,
  },
  title: {
    default: DEFAULT_TITLE,
    template: `${DEFAULT_TITLE}: %s`,
  },

  twitter: {
    card: "summary_large_image",
    creator: "@ova_sw",
    description: DEFAULT_DESCRIPTION,
    images: {
      alt: DEFAULT_TITLE,
      height: 1036,
      url: DEFAULT_IMAGE,
      width: 1556,
    },
    site: "@ova_sw",
    title: DEFAULT_TITLE,
  },
};

type HomePageProps = {
  searchParams: {
    page?: string;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <>
      <Intro />
      <HeroPostsSection page={searchParams.page} />
    </>
  );
}
