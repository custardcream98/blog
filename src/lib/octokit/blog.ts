import fs from "fs"
import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"
import { RequestError } from "octokit"
import path from "path"

import { DEFAULT_CONFIG } from "./_constants"
import { octokit } from "./_instance"

type PostData = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string[]
  series?: string
}

export const getPostsList = unstable_cache(
  async () => {
    if (process.env.NODE_ENV === "development") {
      const data = fs.readFileSync(path.join(process.cwd(), "blog-posts/post-list.json"), "utf-8")

      return JSON.parse(data) as PostData[]
    }

    const { data } = await octokit.rest.repos.getContent({
      ...DEFAULT_CONFIG,
      path: "post-list.json",
      mediaType: {
        format: "raw",
      },
    })

    return JSON.parse(data as unknown as string) as PostData[]
  },
  ["posts-list"],
  {
    tags: ["posts"],
  },
)

const getPostImages = async ({ slug }: { slug: string }) => {
  if (process.env.NODE_ENV === "development") {
    const data = fs.readdirSync(path.join(process.cwd(), `blog-posts/img/${slug}`))

    return data.map((name) => ({
      path: `${slug}/${name}`,
      name,
    }))
  }

  try {
    const { data } = await octokit.rest.repos.getContent({
      ...DEFAULT_CONFIG,
      path: `img/${slug}`,
    })

    return data as unknown as { path: string; name: string }[]
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      return []
    }
    throw error
  }
}

const getPostContent = async ({ slug }: { slug: string }) => {
  if (process.env.NODE_ENV === "development") {
    const data = fs.readFileSync(
      path.join(process.cwd(), "blog-posts/posts", `${slug}.mdx`),
      "utf-8",
    )

    return { data }
  }

  try {
    return (await octokit.rest.repos.getContent({
      ...DEFAULT_CONFIG,
      path: `posts/${slug}.mdx`,
      mediaType: {
        format: "raw",
      },
    })) as unknown as Promise<{ data: string }>
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      return { data: "" }
    }
    throw error
  }
}

const processPostImages = ({
  images,
  content,
}: {
  images: { path: string; name: string }[]
  content: string
}) => {
  let result = content

  if (process.env.NODE_ENV === "development") {
    images.forEach(({ path }) => {
      result = result.replaceAll(`/img/${path}`, `/blog-posts/img/${path}`)
    })

    return result
  }

  images.forEach(({ path }) => {
    result = result.replaceAll(
      `/${path}`,
      `https://storage.googleapis.com/blog-e8ab2.appspot.com/${path}`,
    )
  })
  return result
}

export const getPost = unstable_cache(
  async ({ slug }: { slug: string }) => {
    const [{ data }, images] = await Promise.all([
      getPostContent({ slug }),
      getPostImages({ slug }),
    ])

    if (data === "") {
      notFound()
    }

    return processPostImages({ images, content: data })
  },
  ["post"],
  {
    tags: ["posts"],
  },
)
