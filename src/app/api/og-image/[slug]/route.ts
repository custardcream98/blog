import { getPostsList } from "@/lib/octokit/blog"
import { getThumbnailImageResponse } from "@/lib/thumbnail/imageResponse"

export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const posts = await getPostsList()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    return new Response("Not found", { status: 404 })
  }

  return getThumbnailImageResponse(post.title)
}
