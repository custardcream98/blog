import { notFound } from "next/navigation"

import { PostAutoRefresher } from "@/domains/post/components/__dev__/PostAutoRefresher.client"
import { EmailForm } from "@/domains/post/components/EmailForm/EmailForm.client"
import { Post } from "@/domains/post/components/Post/Post"
import { PrevNextPostNavigator } from "@/domains/post/components/PrevNextPostNavigator"
import { getPostsList } from "@/lib/octokit/blog"

export { generateMetadata } from "./metadata"

export const generateStaticParams = async () => {
  const posts = await getPostsList()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = (await getPostsList()).find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Post slug={slug} />
      <EmailForm slug={slug} title={post.title} />
      <PrevNextPostNavigator slug={slug} />
      {process.env.NODE_ENV === "development" && <PostAutoRefresher />}
    </>
  )
}
