import fs from "fs"
import { unstable_cache } from "next/cache"
import path from "path"

import { DEFAULT_CONFIG } from "./_constants"
import { octokit } from "./_instance"

export type ScrapData = {
  title: string
  url: string
  image?: string
  description?: string
  siteName?: string
  scrapedAt: string
  comment: string
}

export const getScrapsList = unstable_cache(
  async () => {
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const data = fs.readFileSync(path.join(process.cwd(), "blog-posts/scraps.json"), "utf-8")

      return JSON.parse(data) as ScrapData[]
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...DEFAULT_CONFIG,
      path: "scraps.json",
      mediaType: {
        format: "raw",
      },
    })

    return JSON.parse(data as unknown as string) as ScrapData[]
  },
  ["scraps-list"],
  {
    tags: ["scraps"],
  },
)
