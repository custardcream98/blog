import { normalizePostsByYear } from "@/domains/main/utils/normalize"
import { normalizeScrapDataByMonth } from "@/domains/scrap/utils/normalize"
import { getPostsList } from "@/lib/octokit/blog"
import { getScrapsList } from "@/lib/octokit/scraps"
import { objectKeys } from "@/utils/types"

export const dynamic = "force-dynamic"

export default async function sitemap() {
  const [posts, scraps] = await Promise.all([getPostsList(), getScrapsList()])

  const postsByYear = objectKeys(normalizePostsByYear(posts))

  const scrapDataMonths = objectKeys(normalizeScrapDataByMonth(scraps))

  const now = new Date()

  return [
    ...posts.map((post) => ({
      url: `https://shiwoo.dev/posts/${post.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    })),
    {
      url: "https://shiwoo.dev",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postsByYear.map((year) => ({
      url: `https://shiwoo.dev/${year}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    {
      url: "https://shiwoo.dev/resume",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://shiwoo.dev/about",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://shiwoo.dev/scraps",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...scrapDataMonths.map((yyyymm) => {
      const [year, month] = yyyymm.split("-")

      return {
        url: `https://shiwoo.dev/scraps/${year}/${month}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }
    }),
  ]
}
