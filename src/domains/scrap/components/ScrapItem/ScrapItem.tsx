import { Link } from "@/components/Link"
import { evaluateMDX } from "@/lib/mdx/evaluateMDX"
import { ScrapData } from "@/lib/octokit/scraps"
import { cn } from "@/utils/cn"

import "./scrap-item.css"

export const ScrapItem = ({ url, title, image, comment }: ScrapData) => {
  return (
    <div className='rounded-md border border-[#374151] p-3'>
      <Link
        className='flex w-full items-start gap-3'
        href={url}
        rel='noopener noreferrer'
        target='_blank'
      >
        {image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            alt={title}
            className='h-12 w-12 shrink-0 rounded object-cover'
            height={48}
            src={image}
            width={48}
          />
        )}
        <div className='min-w-0'>
          <p className='line-clamp-2 text-sm leading-5 font-medium'>{title}</p>
        </div>
      </Link>
      <Comment comment={comment} />
    </div>
  )
}

const Comment = async ({ comment }: { comment: string }) => {
  const { content } = await evaluateMDX({
    source: comment ?? "",
    components: {
      p: ({ className, children, ...props }) => (
        <p className={cn(className, "my-2")} {...props}>
          {children}
        </p>
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

  return <div className='scrap-item mt-2 text-[0.9rem]'>{content}</div>
}
