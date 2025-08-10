import { Link } from "@/components/Link"
import { getPostsList } from "@/lib/octokit/blog"

const getPrevNextPost = async ({ slug }: { slug: string }) => {
  const posts = await getPostsList()
  const index = posts.findIndex((post) => post.slug === slug)
  return {
    prev: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  } as {
    prev: (typeof posts)[number] | null
    next: (typeof posts)[number] | null
  }
}

export const PrevNextPostNavigator = async ({ slug }: { slug: string }) => {
  const { prev: prevPost, next: nextPost } = await getPrevNextPost({ slug })

  return (
    <aside className='mt-10 flex flex-col gap-4'>
      {prevPost && (
        <Link className='flex flex-col gap-1' href={`/posts/${prevPost.slug}`}>
          <span className='text-foreground/70 text-sm'>← 이전 글</span>
          <span>{prevPost.title}</span>
        </Link>
      )}
      {nextPost && (
        <Link className='flex flex-col items-end gap-1' href={`/posts/${nextPost.slug}`}>
          <span className='text-foreground/70 text-sm'>다음 글 →</span>
          <span>{nextPost.title}</span>
        </Link>
      )}
    </aside>
  )
}
