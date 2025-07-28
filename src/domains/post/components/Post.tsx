import { Time } from "@/components/Time"
import { evaluateMDX } from "@/lib/mdx/evaluateMDX"
import { getPost } from "@/lib/octokit/blog"

export const Post = async ({ slug }: { slug: string }) => {
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
      <Time className='mt-10 block text-sm lg:text-start' date={date} />
      <h2 className='mt-2 text-2xl font-bold'>{title}</h2>
      <p className='text-foreground/70 mt-4 text-sm'>{excerpt}</p>
      {content}
    </>
  )
}
