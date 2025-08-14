import { SubmoduleAutoRefresher } from "@/components/__dev__/SubmoduleAutoRefresher.client"
import { EmailForm } from "@/domains/post/components/EmailForm/EmailForm.client"
import { Post } from "@/domains/post/components/Post/Post"
import { PrevNextPostNavigator } from "@/domains/post/components/PrevNextPostNavigator"
import { getPostContent, getPostMetaData, getPostsList } from "@/lib/octokit/blog"

export { generateMetadata } from "./metadata"

export const dynamicParams = true
export const dynamic = "force-static"

export const generateStaticParams = async () => {
  const posts = await getPostsList()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [content, meta] = await Promise.all([getPostContent({ slug }), getPostMetaData({ slug })])

  return (
    <>
      <Post contents={content} />
      <EmailForm slug={slug} title={meta.title} />
      <PrevNextPostNavigator slug={slug} />
      {process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE && (
        <SubmoduleAutoRefresher />
      )}
    </>
  )
}
