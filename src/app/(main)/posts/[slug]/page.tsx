import "./post.css"

import { Post } from "@/domains/post/components/Post"
import { PrevNextPostNavigator } from "@/domains/post/components/PrevNextPostNavigator"
import { getPostsList } from "@/lib/octokit/blog"

export { generateMetadata } from "./metadata"

export const dynamicParams = true

export const generateStaticParams = async () => {
  const posts = await getPostsList()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <>
      <Post slug={slug} />
      <PrevNextPostNavigator slug={slug} />
    </>
  )
}
