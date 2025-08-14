import {
  METADATA_DEFAULT_TITLE,
  METADATA_DEFAULT_DESCRIPTION,
  METADATA_DEFAULT_URL,
} from "@/app/_sharedMetadata"
import { getPostsList } from "@/lib/octokit/blog"

export const GET = async () => {
  const postsList = await getPostsList()
  const posts = postsList.map((post) => ({
    title: post.title,
    link: `https://shiwoo.dev/posts/${post.slug}`,
    pubDate: post.date,
    ogImage: `https://shiwoo.dev/api/og-image/${post.slug}`,
  }))

  const rss = generateRss(posts)

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}

const generateRss = (
  posts: {
    title: string
    link: string
    pubDate: string
    ogImage: string
  }[],
) => {
  const now = new Date().toUTCString()

  const itemsXml = posts
    .map((post) => {
      return `      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${post.link}</link>
        <guid isPermaLink="false">${post.link}</guid>
        <pubDate>${new Date(`${post.pubDate}T00:00:00+09:00`).toUTCString()}</pubDate>
        <enclosure url="${post.ogImage}" type="image/png" length="0" />
      </item>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${METADATA_DEFAULT_TITLE}</title>
    <link>${METADATA_DEFAULT_URL.toString()}</link>
    <description>${METADATA_DEFAULT_DESCRIPTION}</description>
    <language>ko</language>
    <atom:link rel="self" href="${METADATA_DEFAULT_URL.toString()}rss" type="application/rss+xml" />
    <image>
      <url>${METADATA_DEFAULT_URL.toString()}api/og-image/site</url>
      <title>${METADATA_DEFAULT_TITLE}</title>
      <link>${METADATA_DEFAULT_URL.toString()}</link>
      <width>144</width>
      <height>76</height>
    </image>
    <pubDate>${now}</pubDate>
    <lastBuildDate>${now}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`
}
