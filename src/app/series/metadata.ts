import { sharedMetadata } from "../sharedMetadata"

import { getSeries } from "./data"

import { type Metadata } from "next"

const META_TITLE = "Series"

export const generateMetadata = async (): Promise<Metadata> => {
  const SERIES_COUNT_MAP = await getSeries()
  const SERIES = Object.keys(SERIES_COUNT_MAP)

  return {
    ...sharedMetadata,
    keywords: SERIES,

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
