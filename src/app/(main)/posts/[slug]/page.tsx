import "./post.css"

import { Time } from "@/components/Time"
import { evaluateMDX } from "@/lib/mdx/evaluateMDX"
import { getPost, getPostsList } from "@/lib/octokit/blog"

export { generateMetadata } from "./metadata"

export const dynamicParams = true

export const generateStaticParams = async () => {
  const posts = await getPostsList()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost({ slug })
  const { content, frontmatter } = await evaluateMDX({
    source: post,
    components: {
      wrapper: ({ children }) => <article className='post pt-20 pb-10'>{children}</article>,
    },
  })

  const { title, date, excerpt } = frontmatter as {
    title: string
    date: string
    excerpt: string
  }

  return (
    <>
      <h2 className='mt-10 text-2xl font-bold'>{title}</h2>
      <p className='mt-1 text-end text-sm lg:text-start'>
        <Time date={date} />
      </p>
      <p className='text-foreground/70 mt-4 text-sm'>{excerpt}</p>
      {content}
    </>
  )
}
