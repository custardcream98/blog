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
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const data = fs.readFileSync(path.join(process.cwd(), "blog-posts/post-list.json"), "utf-8")

      return JSON.parse(data) as PostData[]
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
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
    tags: ["posts", "posts-list"],
  },
)

const getPostImages = async ({ slug }: { slug: string }) => {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const data = await fs.promises.readdir(path.join(process.cwd(), `blog-posts/img/${slug}`))

      return data.map((name) => ({
        path: `${slug}/${name}`,
        name,
      }))
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...DEFAULT_CONFIG,
      path: `img/${slug}`,
      mediaType: {
        format: "raw",
      },
    })

    return data as unknown as { path: string; name: string }[]
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      return [] // 이미지나 애셋이 없는 글
    }

    throw error
  }
}

const getRawPostContent = async ({ slug }: { slug: string }) => {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const content = await fs.promises.readFile(
        path.join(process.cwd(), "blog-posts/posts", `${slug}.mdx`),
        "utf-8",
      )

      return content
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...DEFAULT_CONFIG,
      path: `posts/${slug}.mdx`,
      mediaType: {
        format: "raw",
      },
    })

    return data as unknown as string
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      notFound()
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

  if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
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

export const getPostMetaData = async ({ slug }: { slug: string }) => {
  const cached = unstable_cache(
    async () => {
      const posts = await getPostsList()
      const meta = posts.find((post) => post.slug === slug)

      if (!meta) notFound()

      return meta
    },
    [`post-meta-data:${slug}`],
    {
      tags: ["posts", `post-meta-data:${slug}`, `post:${slug}`],
    },
  )

  return cached()
}

export const getPostContent = async ({ slug }: { slug: string }) => {
  const cached = unstable_cache(
    async () => {
      const [content, images] = await Promise.all([
        getRawPostContent({ slug }),
        getPostImages({ slug }),
      ])

      return processPostImages({ images, content })
    },
    [`post-content:${slug}`],
    {
      tags: ["posts", `post-content:${slug}`, `post:${slug}`],
    },
  )

  return cached()
}
