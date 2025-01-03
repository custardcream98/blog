import { getAllPosts, getPostBySlug } from "src/app/data"
import { Container } from "src/components"
import { FONT_NOTO_SERIF_KR } from "src/fonts"
import { compilePostMDX } from "src/lib/mdx"
import generateRSSFeed from "src/lib/rss"
import { getAllOgImages } from "src/lib/thumbnails/ogImage"

import { Comments, PostTitle, PrevNextPost } from "./_components"
import { createPostDoc, getPrevNextPosts } from "./data"
import type { PostPageParams } from "./types"

import "src/lib/mdx/PostMDX/post.css"

import { utld } from "utility-class-components"

export { generateMetadata } from "./metadata"

const createAllPostDocs = (posts: { title: string }[]) =>
  Promise.all(posts.map((post) => createPostDoc(post.title)))

export const generateStaticParams = async () => {
  const posts = await getAllPosts(["slug", "title"])

  if (process.env.NODE_ENV === "production") {
    const coverImages = await getAllOgImages(posts.map((post) => post.title))
    const darkThumbnails = coverImages.map(({ darkThumbnail }) => darkThumbnail)
    await generateRSSFeed(darkThumbnails)
    await createAllPostDocs(posts)
  }

  return posts.map(({ slug }) => ({
    slug,
  }))
}

export default async function PostsDynamicPage({ params }: PostPageParams) {
  const { slug } = await params

  const { coverImage, title, category, date, series, content } = await getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "content",
    "category",
    "series",
    "coverImage",
  ])

  const prevNextPosts = await getPrevNextPosts(slug)

  const postTitleForComments = title.replaceAll("/", ",")

  const postContent = await compilePostMDX(content)

  return (
    <PostContainer>
      <PostSection>
        <PostTitle
          coverImage={coverImage}
          title={title}
          category={category}
          date={date}
          series={series}
        />
        {postContent}
      </PostSection>
      <PrevNextPost key={slug} {...prevNextPosts} />
      {(process.env.BLOG_ENV === "query" || process.env.NODE_ENV === "production") && (
        <Comments postTitle={postTitleForComments} />
      )}
    </PostContainer>
  )
}

const PostContainer = utld(Container)`
  !max-w-[42.5rem]

  ${FONT_NOTO_SERIF_KR.variable}
`

const PostSection = utld.section`
  w-full
`
