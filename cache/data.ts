import { PostMeta } from "src/app/data"
import { compileMDXForCache } from "src/lib/mdx"
import type PostType from "src/types/post"

import fs from "fs"
import path from "path"

const DIRECTORY_POSTS = path.join(process.cwd(), "_posts")

const getPostFile = async (slug: string) => {
  const fullPath = path.join(DIRECTORY_POSTS, `${slug}.mdx`)
  const file = fs.readFileSync(fullPath, "utf8")

  const { content, frontmatter } = await compileMDXForCache(file)

  return { content, data: frontmatter }
}

export const getPostSlugs = () => {
  return fs
    .readdirSync(DIRECTORY_POSTS)
    .filter((dir) => /\.mdx$/.test(dir))
    .map((dir) => dir.replace(/\.mdx$/, ""))
}

export const getAllPosts = async <Field extends PostMeta[]>(fields: Field) => {
  const slugs = getPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)))
  const sortedPosts = posts.sort(
    (post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime(),
  )

  return sortedPosts
}

type Change<T, U extends keyof T, V> = Omit<T, U> & { [K in U]: V }
type PostByFields<Fields extends PostMeta> = Pick<
  Change<PostType, "content", React.ReactElement<any, string | React.JSXElementConstructor<any>>>,
  "date" | Fields
>

export const getPostBySlug = async <Field extends PostMeta[]>(
  slug: string,
  fields: Field,
): Promise<PostByFields<Field[number]>> => {
  const { data, content } = await getPostFile(slug)

  const postMeta = fields.reduce((postMeta, field) => {
    if (field === "slug") {
      return {
        ...postMeta,
        slug,
      }
    } else if (field === "content") {
      return {
        ...postMeta,
        content,
      }
    } else if (data[field] !== undefined) {
      return {
        ...postMeta,
        [field]: data[field],
      }
    }
    return postMeta
  }, {} as PostByFields<Field[number]>)

  return postMeta
}
