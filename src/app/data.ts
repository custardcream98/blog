import { getOgImage } from "src/lib/thumbnails/ogImage"
import type { PostType } from "src/types/post"

import fs from "fs"
import matter from "gray-matter"
import path from "path"

export type PostMeta = keyof PostType

const DIRECTORY_POSTS = path.join(process.cwd(), "_posts")

export const getPostSlugs = () => {
  return fs
    .readdirSync(DIRECTORY_POSTS)
    .filter((dir) => /\.mdx$/.test(dir))
    .map((dir) => dir.replace(/\.mdx$/, ""))
}

const getPostFileData = (slug: string) => {
  const fullPath = path.join(DIRECTORY_POSTS, `${slug}.mdx`)
  const file = fs.readFileSync(fullPath, "utf8")
  return matter(file)
}

type PostByFields<Fields extends PostMeta> = Pick<PostType, "date" | Fields>

export const getAllPosts = async <Field extends PostMeta[]>(fields: Field) => {
  const slugs = getPostSlugs()
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)))).sort(
    (post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime(),
  )

  return posts
}

const hasField = <T extends object, FieldType>(
  targetObject: T,
  targetField: PostMeta,
  fields: PostMeta[],
): targetObject is T & Record<typeof targetField, FieldType> => fields.includes(targetField)

export const getPostBySlug = async <Field extends PostMeta[]>(
  slug: string,
  fields: Field,
): Promise<PostByFields<Field[number]>> => {
  const { data, content } = getPostFileData(slug)

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

  if (hasField(postMeta, "coverImage", fields)) {
    postMeta.coverImage = await getOgImage(data.title)
  }

  postMeta.date = data.date

  return postMeta
}
