import { notFound } from "next/navigation"

import { Link } from "@/components/Link"
import { PageHeader } from "@/components/PageHeader"
import { PostItem } from "@/domains/main/components/PostItem"
import { normalizePostsByYear, PostYear } from "@/domains/main/utils/normalize"
import { getPostsList } from "@/lib/octokit/blog"
import { cn } from "@/utils/cn"
import { objectKeys } from "@/utils/types"

const POSTS_TO_SHOW_ON_HOME = 6

export const generateStaticParams = async () => {
  const posts = await getPostsList()
  const postsByYear = normalizePostsByYear(posts)

  return objectKeys(postsByYear).map((year) => ({ year: [year] }))
}

export const dynamicParams = true
export const dynamic = "force-static"

export default async function MainPage({ params }: { params: Promise<{ year?: [PostYear] }> }) {
  const [yearParam, postsList] = await Promise.all([
    params.then(({ year }) => year?.[0] ?? null),
    getPostsList(),
  ])
  const postsByYear = normalizePostsByYear(postsList)

  const posts = yearParam
    ? (postsByYear[yearParam] ?? notFound())
    : postsList.slice(0, POSTS_TO_SHOW_ON_HOME)

  return (
    <section className='mt-5'>
      <PageHeader
        className='mb-2 md:mb-6'
        title={
          <span className='sr-only'>{yearParam ? `${yearParam}년 포스트` : "최근 포스트"}</span>
        }
      >
        <nav className='text-foreground/70 text-sm'>
          <ol className='flex flex-wrap items-center gap-2'>
            {objectKeys(postsByYear)
              .sort((a, b) => Number(a) - Number(b))
              .map((year) => (
                <li key={year}>
                  <Link className={cn(yearParam === year && "text-foreground")} href={`/${year}`}>
                    {year}
                  </Link>
                </li>
              ))}
            <li>
              <Link className={cn(!yearParam && "text-foreground")} href='/'>
                Recent
              </Link>
            </li>
          </ol>
        </nav>
      </PageHeader>
      <ul>
        {posts.map(({ slug, date, excerpt, title }) => (
          <li className='py-6' key={slug}>
            <Link className='w-full' href={`/posts/${slug}`}>
              <PostItem date={date} description={excerpt} title={title} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
