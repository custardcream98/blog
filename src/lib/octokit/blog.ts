import fs from "fs"
import { unstable_cache } from "next/cache"
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

    try {
      const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        ...DEFAULT_CONFIG,
        path: "post-list.json",
        mediaType: {
          format: "raw",
        },
      })

      return JSON.parse(data as unknown as string) as PostData[]
    } catch (error) {
      console.error("ERROR [getPostsList] ", error)
      return []
    }
  },
  ["posts-list"],
  {
    tags: ["posts"],
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
    console.error("ERROR [getPostImages] ", slug, error)

    return []
  }
}

const getPostContent = async ({ slug }: { slug: string }) => {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const data = await fs.promises.readFile(
        path.join(process.cwd(), "blog-posts/posts", `${slug}.mdx`),
        "utf-8",
      )

      return { data }
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...DEFAULT_CONFIG,
      path: `posts/${slug}.mdx`,
      mediaType: {
        format: "raw",
      },
    })

    return { data: data as unknown as string }
  } catch (error) {
    console.error("ERROR [getPostContent] ", slug, error)

    return { data: null }
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

export const getPost = unstable_cache(
  async ({ slug }: { slug: string }) => {
    const [{ data }, images] = await Promise.all([
      getPostContent({ slug }),
      getPostImages({ slug }),
    ])

    if (data === null) {
      return null
    }

    return processPostImages({ images, content: data })
  },
  ["post"],
  {
    tags: ["posts"],
  },
)
