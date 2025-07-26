import { getPostsList } from "@/lib/octokit/blog"

export const dynamic = "force-dynamic"

export default async function sitemap() {
  const posts = await getPostsList()

  return [
    ...posts.map((post) => ({
      url: `https://shiwoo.dev/posts/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    })),
    {
      url: "https://shiwoo.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://shiwoo.dev/resume",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
