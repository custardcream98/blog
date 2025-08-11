import { notFound } from "next/navigation"

import { SubmoduleAutoRefresher } from "@/components/__dev__/SubmoduleAutoRefresher.client"
import { EmailForm } from "@/domains/post/components/EmailForm/EmailForm.client"
import { Post } from "@/domains/post/components/Post/Post"
import { PrevNextPostNavigator } from "@/domains/post/components/PrevNextPostNavigator"
import { getPost, getPostsList } from "@/lib/octokit/blog"

export { generateMetadata } from "./metadata"

export const generateStaticParams = async () => {
  const posts = await getPostsList()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [post, postData] = await Promise.all([
    getPost({ slug }),
    getPostsList().then((posts) => posts.find((post) => post.slug === slug)),
  ])

  if (post === null || typeof postData === "undefined") {
    notFound()
  }

  return (
    <>
      <Post contents={post} />
      <EmailForm slug={slug} title={postData.title} />
      <PrevNextPostNavigator slug={slug} />
      {process.env.NODE_ENV === "development" && <SubmoduleAutoRefresher />}
    </>
  )
}
