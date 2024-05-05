import { getPostBySlug } from "src/app/data"
import { sharedMetadata } from "src/app/sharedMetadata"

import type { PostPageParams } from "./types"

import { type Metadata } from "next"

export const generateMetadata = async ({ params: { slug } }: PostPageParams): Promise<Metadata> => {
  const { title, date, excerpt, coverImage, category, series } = await getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "coverImage",
    "category",
    "series",
  ])

  const META_TITLE = title
  const META_DESCRIPTION = excerpt
  const META_KEYWORDS = series ? [...category, series] : category
  const META_IMAGE = {
    alt: `${title} 포스트 썸네일`,
    height: 630,
    url: coverImage.darkThumbnail,
    width: 1200,
  }

  return {
    ...sharedMetadata,
    description: META_DESCRIPTION,
    keywords: META_KEYWORDS,
    openGraph: {
      ...sharedMetadata.openGraph,
      authors: "Shiwoo, Park",
      description: META_DESCRIPTION,
      images: META_IMAGE,
      publishedTime: date,
      tags: META_KEYWORDS,
      title: {
        absolute: META_TITLE,
      },
      type: "article",
      url: `/posts/${slug}`,
    },
    publisher: "Shiwoo, Park",

    title: META_TITLE,

    twitter: {
      ...sharedMetadata.twitter,
      description: META_DESCRIPTION,
      images: META_IMAGE,
      title: {
        absolute: META_TITLE,
      },
    },
  }
}
