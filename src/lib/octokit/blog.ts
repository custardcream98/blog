import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"
import path from "path"

import { getFileContent } from "@/lib/octokit/_utils"

export type PostData = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string[]
  series?: string
}

export const getPostsList = unstable_cache(
  () =>
    getFileContent<PostData[]>({
      fetchPath: "post-list.json",
      localPath: path.join(process.cwd(), "blog-posts/post-list.json"),
      fallback: (error) => {
        throw error
      },
    }),
  ["posts-list"],
  {
    tags: ["posts", "posts-list"],
  },
)

const getPostImages = ({ slug }: { slug: string }) =>
  getFileContent<{ path: string; name: string }[]>({
    fetchPath: `img/${slug}`,
    localPath: path.join(process.cwd(), `blog-posts/img/${slug}`),
    fallback: () => [], // 이미지나 애셋이 없는 글
  })

export const getRawPostContent = ({ slug }: { slug: string }) => {
  const cached = unstable_cache(
    async () =>
      getFileContent<string>({
        fetchPath: `posts/${slug}.mdx`,
        localPath: path.join(process.cwd(), "blog-posts/posts", `${slug}.mdx`),
        fallback: () => notFound(),
      }),
    [`post-content:${slug}`],
    {
      tags: ["posts", `post-raw-content:${slug}`, `post:${slug}`],
    },
  )

  return cached()
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

export const getPostMetaData = ({ slug }: { slug: string }) => {
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

export const getPostContent = ({ slug }: { slug: string }) => {
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
