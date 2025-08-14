import { Metadata } from "next"

import { sharedMetadata } from "@/app/_sharedMetadata"
import { getPostMetaData } from "@/lib/octokit/blog"

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostMetaData({ slug })

  return {
    ...sharedMetadata,
    title: post.title,
    description: post.excerpt,
    keywords: post.category,
    openGraph: {
      ...sharedMetadata.openGraph,
      description: post.excerpt,
    },
    twitter: {
      ...sharedMetadata.twitter,
      description: post.excerpt,
    },
  }
}
