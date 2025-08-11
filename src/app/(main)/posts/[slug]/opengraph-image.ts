import { getPostsList } from "@/lib/octokit/blog"
import { getThumbnailImageResponse } from "@/lib/thumbnail/imageResponse"

export const alt = "shiwoo.dev"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = await getPostsList()
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return new Response("Not found", { status: 404 })
  }

  return getThumbnailImageResponse(post.title)
}
