import { Metadata } from "next"
import { notFound } from "next/navigation"

import { sharedMetadata } from "@/app/_sharedMetadata"
import { getPostsList } from "@/lib/octokit/blog"

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const posts = await getPostsList()
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

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
