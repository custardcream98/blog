import fs from "fs"
import path from "path"

import { cache } from "@/utils/cache"

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

export const getScrapsList = cache(
  async () => {
    if (process.env.NODE_ENV === "development") {
      const data = fs.readFileSync(path.join(process.cwd(), "blog-posts/scraps.json"), "utf-8")

      return JSON.parse(data) as ScrapData[]
    }

    const { data } = await octokit.rest.repos.getContent({
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
