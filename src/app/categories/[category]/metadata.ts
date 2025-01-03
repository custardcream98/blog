import { sharedMetadata } from "src/app/sharedMetadata"

import type { CategoryPageParams } from "./types"

import { type Metadata } from "next"

export const generateMetadata = async ({ params }: CategoryPageParams): Promise<Metadata> => {
  const { category } = await params
  const parsedCategory = decodeURIComponent(category)
  const META_TITLE = `카테고리 - ${parsedCategory}`

  return {
    ...sharedMetadata,
    keywords: parsedCategory,
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
