import { getPostMetaData } from "@/lib/octokit/blog"
import { getThumbnailImageResponse } from "@/lib/thumbnail/imageResponse"

export const alt = "shiwoo.dev"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostMetaData({ slug })

  return getThumbnailImageResponse(post.title)
}
