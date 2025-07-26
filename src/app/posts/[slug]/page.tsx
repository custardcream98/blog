import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc"

import "./post.css"
import Image from "next/image"
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"

import { Time } from "@/components/Time"
import { externalLink, headingToStartFrom } from "@/lib/mdx-plugin"
import { getPost } from "@/lib/octokit/blog"

export { generateMetadata } from "./metadata"

const REHYPE_PRETTY_CODE_OPTIONS: Partial<RehypePrettyCodeOptions> = {
  onVisitHighlightedLine(node) {
    if (!node.properties) {
      node.properties = {}
    }
    node.properties["data-highlighted-line"] = true
  },
  theme: "github-dark" as const,
}

const MDX_OPTIONS: EvaluateOptions = {
  mdxOptions: {
    rehypePlugins: [
      [
        externalLink,
        {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ],
      rehypeSlug,
      [rehypePrettyCode, REHYPE_PRETTY_CODE_OPTIONS],
      [headingToStartFrom, { startFrom: 3 }],
    ],
  },
  parseFrontmatter: true,
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost({ slug })
  const { content, frontmatter } = await evaluate({
    source: post,
    options: MDX_OPTIONS,
    components: {
      img: Image,
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
