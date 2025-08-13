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
    if (process.env.NODE_ENV === "development") {
      const data = fs.readFileSync(path.join(process.cwd(), "blog-posts/scraps.json"), "utf-8")

      return JSON.parse(data) as ScrapData[]
    }

    try {
      const { data } = await octokit.rest.repos.getContent({
        ...DEFAULT_CONFIG,
        path: "scraps.json",
        mediaType: {
          format: "raw",
        },
      })

      return JSON.parse(data as unknown as string) as ScrapData[]
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        console.log(error.name, error.message, error.stack)
      }
      throw error
    }
  },
  ["scraps-list"],
  {
    tags: ["scraps"],
  },
)
