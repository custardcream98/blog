import { getScrapThumbnailsMap } from "@/lib/octokit/scraps"

export const getScrapThumbnail = async (url: string) => {
  const thumbnails = await getScrapThumbnailsMap()
  return url in thumbnails ? thumbnails[url] : null
}
