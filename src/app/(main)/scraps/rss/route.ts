import { metadata as scrapsMetadata } from "@/app/(main)/scraps/metadata"
import { METADATA_DEFAULT_URL } from "@/app/_sharedMetadata"
import { getScrapsList } from "@/lib/octokit/scraps"

const META_TITLE = "shiwoo.dev: scraps"
const META_LINK = `${METADATA_DEFAULT_URL.toString()}scraps`
const META_DESCRIPTION = scrapsMetadata.description
const SCRAPS_MAX_COUNT = 100

export const GET = async () => {
  const scrapsList = await getScrapsList()
  const scraps = scrapsList.slice(0, SCRAPS_MAX_COUNT).map((scrap) => ({
    title: scrap.title,
    link: scrap.url,
    pubDate: scrap.scrapedAt,
    ogImage: scrap.image,
    description: scrap.comment,
  }))

  const rss = generateRss(scraps)

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}

const generateRss = (
  scraps: {
    title: string
    link: string
    pubDate: string
    ogImage?: string
    description: string
  }[],
) => {
  const now = new Date().toUTCString()

  const itemsXml = scraps
    .map((scrap) => {
      return `      <item>
        <title><![CDATA[${scrap.title}]]></title>
        <link>${scrap.link}</link>
        <guid isPermaLink="false">${scrap.link}</guid>
        <pubDate>${new Date(scrap.pubDate).toUTCString()}</pubDate>
        <description><![CDATA[${scrap.description}]]></description>${scrap.ogImage ? `\n        <enclosure url="${scrap.ogImage}" type="image/png" length="0" />` : ""}
      </item>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${META_TITLE}</title>
    <link>${META_LINK}</link>
    <description>${META_DESCRIPTION}</description>
    <language>ko</language>
    <atom:link rel="self" href="${META_LINK}/rss" type="application/rss+xml" />
    <image>
      <url>${METADATA_DEFAULT_URL.toString()}api/og-image/site</url>
      <title>${META_TITLE}</title>
      <link>${META_LINK}</link>
      <width>144</width>
      <height>76</height>
    </image>
    <pubDate>${now}</pubDate>
    <lastBuildDate>${now}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`
}
