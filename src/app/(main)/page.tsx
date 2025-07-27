import { Link } from "@/components/Link"
import { PostItem } from "@/domains/main/components/PostItem"
import { getPostsList } from "@/lib/octokit/blog"

export default async function HomePage() {
  const posts = await getPostsList()

  return (
    <section aria-label='posts'>
      <ul>
        {posts.map((post) => (
          <li className='py-6' key={post.slug}>
            <Link className='w-full' href={`/posts/${post.slug}`}>
              <PostItem date={post.date} description={post.excerpt} title={post.title} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
