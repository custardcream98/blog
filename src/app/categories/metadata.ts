import { sharedMetadata } from "../sharedMetadata"

import { CATEGORIES } from "./data"

import { type Metadata } from "next"

const META_TITLE = "Categories"

export const metadata: Metadata = {
  ...sharedMetadata,
  keywords: CATEGORIES,

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
