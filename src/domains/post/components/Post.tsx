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
      <h2 className='mt-10 text-2xl font-bold'>{title}</h2>
      <p className='mt-1 text-end text-sm lg:text-start'>
        <Time date={date} />
      </p>
      <p className='text-foreground/70 mt-4 text-sm'>{excerpt}</p>
      {content}
    </>
  )
}
