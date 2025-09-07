import { unstable_cache } from "next/cache"
import path from "path"

import { getFileContent } from "@/lib/octokit/_utils"

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
    const data = await getFileContent<ScrapData[]>({
      fetchPath: "scraps.json",
      localPath: path.join(process.cwd(), "blog-posts/scraps.json"),
      fallback: () => [],
    })

    return sortScrapData(data).map(normalizeData)
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

export const getScrapThumbnailsMap = unstable_cache(
  () =>
    getFileContent<{
      [originalUrl: string]: ScrapThumbnailData
    }>({
      fetchPath: "scrap-thumbnails.json",
      localPath: path.join(process.cwd(), "blog-posts/scrap-thumbnails.json"),
      fallback: (error) => {
        throw error
      },
    }),
  ["scraps-images-list"],
)
