import { cache } from "react"

import { octokit } from "./instance"

const DEFAULT_CONFIG = {
  owner: "custardcream98",
  repo: "blog-posts",
} as const

export const getPostsList = cache(async () => {
  const { data } = await octokit.rest.repos.getContent({
    ...DEFAULT_CONFIG,
    path: "post-list.json",
    mediaType: {
      format: "raw",
    },
  })

  return JSON.parse(data as unknown as string) as {
    slug: string
    title: string
    excerpt: string
    date: string
    category: string[]
    series?: string
  }[]
})

export const getPostImages = async ({ slug }: { slug: string }) => {
  const { data } = await octokit.rest.repos.getContent({
    ...DEFAULT_CONFIG,
    path: `img/${slug}`,
  })

  return data as unknown as { path: string; name: string }[]
}

export const getPost = cache(async ({ slug }: { slug: string }) => {
  const [{ data }, images] = await Promise.all([
    octokit.rest.repos.getContent({
      ...DEFAULT_CONFIG,
      path: `posts/${slug}.mdx`,
      mediaType: {
        format: "raw",
      },
    }) as unknown as Promise<{ data: string }>,
    getPostImages({ slug }),
  ])

  let result = data
  images.forEach(({ path }) => {
    console.log("path", path)
    result = result.replaceAll(
      `/${path}`,
      `https://storage.googleapis.com/blog-e8ab2.appspot.com/${path}`,
    )
  })

  return result
})
