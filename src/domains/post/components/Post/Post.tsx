import matter from "gray-matter"

import { Time } from "@/components/Time"
import { evaluateMDX } from "@/lib/mdx/evaluateMDX"
import { getPost } from "@/lib/octokit/blog"
import { cn } from "@/utils/cn"

import "./post.css"

export const Post = async ({ slug }: { slug: string }) => {
  const post = await getPost({ slug })

  const { toc } = matter(post).data as { toc?: boolean }

  const { content, frontmatter } = await evaluateMDX({
    source: post,
    shouldAddTableOfContents: toc,
    components: {
      wrapper: ({ children }) => <article className='post pt-20 pb-10'>{children}</article>,
      h3: ({ className, children, ...props }) => (
        <h3
          className={cn(
            className,
            HEADING_COMMON_STYLES,
            "mt-16 mb-8 border-b border-solid border-[#374151] pb-3 text-[1.6rem] font-bold",
          )}
          {...props}
        >
          {children}
          <HeadingLink id={props.id} />
        </h3>
      ),
      h4: ({ className, children, ...props }) => (
        <h4 className={cn(className, HEADING_COMMON_STYLES, "text-[1.4rem]")} {...props}>
          {children}
          <HeadingLink id={props.id} />
        </h4>
      ),
      h5: ({ className, children, ...props }) => (
        <h5 className={cn(className, HEADING_COMMON_STYLES, "text-[1.23rem]")} {...props}>
          {children}
          <HeadingLink id={props.id} />
        </h5>
      ),
      h6: ({ className, children, ...props }) => (
        <h6 className={cn(className, HEADING_COMMON_STYLES, "text-[1.15rem]")} {...props}>
          {children}
          <HeadingLink id={props.id} />
        </h6>
      ),
      a: ({ className, children, ...props }) => (
        <a
          className={cn(
            className,
            "border-b border-solid border-b-transparent pb-[1px] text-[#a78bfa] transition-colors duration-300",
            "hover:border-b-[#c4b5fd] hover:text-[#c4b5fd] focus:border-b-[#c4b5fd] focus:text-[#c4b5fd]",
          )}
          {...props}
        >
          {children}
        </a>
      ),
      em: ({ className, children, ...props }) => (
        <em className={cn(className, "mr-[0.1rem]")} {...props}>
          {children}
        </em>
      ),
      strong: ({ className, children, ...props }) => (
        <strong className={cn(className, "font-medium")} {...props}>
          {children}
        </strong>
      ),
    },
  })

  const { title, date, excerpt } = frontmatter as {
    title: string
    date: string
    excerpt: string
    category: string[]
    series?: string
    toc?: boolean
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

const HEADING_COMMON_STYLES =
  "text-foreground mt-12 mb-6 leading-[1.4] font-semibold tracking-tight"

const HeadingLink = ({ id }: { id: string }) => (
  <a
    aria-hidden='true'
    className='text-foreground/60 hover:text-foreground/80 ml-1 opacity-0 transition-all duration-300 [*:hover>&]:opacity-100'
    href={`#${id}`}
    tabIndex={-1}
  >
    #
  </a>
)
