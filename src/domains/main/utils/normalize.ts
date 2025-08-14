import { PostData } from "@/lib/octokit/blog"
import { Brand } from "@/utils/types"

export type PostYear = Brand<`${number}`, "PostYear">

export const normalizePostsByYear = (posts: PostData[]) => {
  return posts.reduce<Record<PostYear, PostData[]>>((acc, post) => {
    const year = post.date.split("-")[0] as PostYear

    if (!acc[year]) acc[year] = []
    acc[year].push(post)

    return acc
  }, {})
}
