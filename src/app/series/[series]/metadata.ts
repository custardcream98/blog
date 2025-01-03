import { sharedMetadata } from "src/app/sharedMetadata"

import { SeriesPageParams } from "./types"

import { type Metadata } from "next"

export const generateMetadata = async ({ params }: SeriesPageParams): Promise<Metadata> => {
  const { series } = await params
  const parsedSeries = decodeURIComponent(series)
  const META_TITLE = `시리즈 - ${parsedSeries}`

  return {
    ...sharedMetadata,
    keywords: parsedSeries,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: META_TITLE,
    },

    title: META_TITLE,

    twitter: {
      ...sharedMetadata.twitter,
      title: META_TITLE,
    },
  }
}
