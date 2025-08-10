import { normalizeScrapDataByMonth } from "@/domains/scrap/utils/normalize"
import { getPostsList } from "@/lib/octokit/blog"
import { getScrapsList } from "@/lib/octokit/scraps"
import { objectKeys } from "@/utils/types"

export const dynamic = "force-dynamic"

export default async function sitemap() {
  const posts = await getPostsList()
  const scrapDataMonths = objectKeys(normalizeScrapDataByMonth(await getScrapsList()))

  return [
    ...posts.map((post) => ({
      url: `https://shiwoo.dev/posts/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    })),
    {
      url: "https://shiwoo.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shiwoo.dev/resume",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://shiwoo.dev/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://shiwoo.dev/scraps",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...scrapDataMonths.map((yyyymm) => {
      const [year, month] = yyyymm.split("-")

      return {
        url: `https://shiwoo.dev/scraps/${year}/${month}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      }
    }),
  ]
}
