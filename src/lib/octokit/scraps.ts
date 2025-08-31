import fs from "fs"
import { unstable_cache } from "next/cache"
import path from "path"

import { DEFAULT_CONFIG } from "./_constants"
import { octokit } from "./_instance"

export type ScrapData = {
  title: string
  url: string
  scrapedAt: string
  comment: string
}

const sortScrapData = (scraps: ScrapData[]) =>
  scraps.sort((a, b) => new Date(b.scrapedAt).getTime() - new Date(a.scrapedAt).getTime())
const normalizeData = ({
  title,
  url,
  scrapedAt,
  comment,
}: ScrapData & {
  image?: string
  description?: string
  siteName?: string
}) => ({
  title,
  url,
  scrapedAt,
  comment,
})

export const getScrapsList = unstable_cache(
  async () => {
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const data = fs.readFileSync(path.join(process.cwd(), "blog-posts/scraps.json"), "utf-8")

      return sortScrapData(JSON.parse(data) as ScrapData[]).map(normalizeData)
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...DEFAULT_CONFIG,
      path: "scraps.json",
      mediaType: {
        format: "raw",
      },
    })

    return sortScrapData(JSON.parse(data as unknown as string) as ScrapData[]).map(normalizeData)
  },
  ["scraps-list"],
  {
    tags: ["scraps"],
  },
)

export type ScrapThumbnailData = {
  url: string
  width: number
  height: number
}

export const getScrapThumbnailsMap = unstable_cache(async () => {
  if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
    const data = fs.readFileSync(
      path.join(process.cwd(), "blog-posts/scrap-thumbnails.json"),
      "utf-8",
    )
    return JSON.parse(data) as {
      [originalUrl: string]: ScrapThumbnailData
    }
  }

  const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    ...DEFAULT_CONFIG,
    path: "scrap-thumbnails.json",
    mediaType: {
      format: "raw",
    },
  })

  return JSON.parse(data as unknown as string) as {
    [originalUrl: string]: ScrapThumbnailData
  }
}, ["scraps-images-list"])
