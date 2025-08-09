import { Metadata } from "next"

import { metadata as scrapsMetadata } from "../../metadata"

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ year: string; month: string }>
}): Promise<Metadata> => {
  const { year, month } = await params

  return {
    ...scrapsMetadata,
    title: `shiwoo.dev: ${year}년 ${month}월 스크랩`,
  }
}
