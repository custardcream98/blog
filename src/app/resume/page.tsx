import fs from "fs"
import path from "path"

import { LinkSvg } from "@/assets/svg/LinkSvg"
import { evaluateMDX } from "@/lib/mdx/evaluateMDX"
import { cn } from "@/utils/cn"

import "./resume.css"

const getResumeSource = () =>
  fs.readFileSync(path.join(process.cwd(), "src/domains/resume/resume.mdx"), "utf8")

const Strong = ({ children }: React.PropsWithChildren) => (
  <strong className='font-normal text-yellow-500'>{children}</strong>
)

const P = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={cn("mb-2", className)} {...props} />
)
const H3 = ({ className, ...props }: React.ComponentProps<"h3">) => (
  <h3 className={cn("mt-8 mb-4 text-xl font-medium", className)} {...props} />
)
const H4 = ({ className, ...props }: React.ComponentProps<"h4">) => (
  <h4 className={cn("mb-1 text-[1.1em] font-medium", className)} {...props} />
)
const H5 = ({ className, ...props }: React.ComponentProps<"h5">) => (
  <h5 className={cn("mb-1 text-base font-medium", className)} {...props} />
)

const Ul = ({ className, ...props }: React.ComponentProps<"ul">) => (
  <ul
    className={cn(
      "marker:text-[1em] marker:font-semibold marker:text-yellow-500 marker:content-['-']",
      className,
    )}
    {...props}
  />
)

const Li = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li className={cn("my-[0.4em] ml-[0.4em] pl-[0.6em]", className)} {...props} />
)

export default async function ResumePage() {
  const source = getResumeSource()

  const { content } = await evaluateMDX({
    source,
    components: {
      Contact,
      Career,
      Project,
      Experience,
      strong: Strong,
      p: P,
      h3: H3,
      h4: H4,
      h5: H5,
      ul: Ul,
      li: Li,
    },
    codeTheme: "one-light",
  })

  return (
    <div className='font-light'>
      <h1 className='mb-8 text-2xl'>
        안녕하세요,
        <br />
        <strong className='font-bold'>프론트엔드 개발자 박시우</strong>입니다.
      </h1>
      {content}
    </div>
  )
}

const ExternalLink = ({
  children,
  href,
  name,
}: React.PropsWithChildren<{ href: string; name: string }>) => (
  <a
    className='flex items-center gap-1 text-sm underline underline-offset-2'
    href={href}
    rel='noopener noreferrer'
    target='_blank'
  >
    <LinkSvg className='size-3' />
    <span className='hidden md:inline'>{children}</span>
    <span className='inline md:hidden'>{name}</span>
  </a>
)

const Contact = () => {
  return (
    <ul className='mt-5 mb-10 flex w-full justify-end gap-2'>
      <li>
        <ExternalLink href='mailto:custardcream@kakao.com' name='이메일'>
          custardcream@kakao.com
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href='https://github.com/custardcream98' name='GitHub'>
          github.com/custardcream98
        </ExternalLink>
      </li>
      <li className='hidden print:block'>
        <ExternalLink href='https://shiwoo.dev' name='블로그'>
          shiwoo.dev
        </ExternalLink>
      </li>
    </ul>
  )
}

const Badge = ({ children }: React.PropsWithChildren) => (
  <span className='rounded-md bg-gray-100 px-2 py-1 text-xs'>{children}</span>
)

type Duration = {
  start: `${number}년 ${number}월`
  end?: `${number}년 ${number}월`
}

const durationToText = (duration: Duration) => {
  if (duration.start === duration.end) return duration.start

  return `${duration.start} ~ ${duration.end ?? "현재"}`
}

const Career = ({
  name,
  duration,
  position,
  stacks,
  children,
}: React.PropsWithChildren<{
  name: string
  duration: Duration
  position: string
  stacks: string[]
}>) => {
  return (
    <div className='mb-10'>
      <H4 className='mb-0'>{name}</H4>
      <p className='mb-1 text-sm'>{durationToText(duration)}</p>
      <p className='mb-1 text-sm'>{position}</p>
      <p className='mb-2 flex flex-wrap gap-1'>
        {stacks.map((stack) => (
          <Badge key={stack}>{stack}</Badge>
        ))}
      </p>
      {children}
    </div>
  )
}

const Project = ({
  name,
  description,
  duration,
  stacks,
  links,
  children,
}: React.PropsWithChildren<{
  name: string
  description?: string
  duration?: Duration
  stacks?: string[]
  links?: {
    name: string
    href: string
  }[]
}>) => {
  return (
    <div className='mb-10'>
      <H4 className='mb-0'>{name}</H4>
      {duration && <p className='mb-1 text-sm'>{durationToText(duration)}</p>}
      {description && <p className='mb-1 text-base'>{description}</p>}
      {stacks && (
        <p className='mb-2 flex flex-wrap gap-1'>
          {stacks.map((stack) => (
            <Badge key={stack}>{stack}</Badge>
          ))}
        </p>
      )}
      {links && (
        <ul className='mb-2 flex flex-wrap gap-1'>
          {links.map((link) => (
            <li key={link.name}>
              <ExternalLink href={link.href} name={link.name}>
                {link.href}
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  )
}

const Experience = ({
  name,
  description,
  duration,
  children,
}: React.PropsWithChildren<{
  name: string
  description?: string
  duration?: Duration
}>) => {
  return (
    <div className='mb-5'>
      <H4 className='mb-0'>{name}</H4>
      {duration && <p className='mb-1 text-sm'>{durationToText(duration)}</p>}
      {description && <p className='mb-1 text-base'>{description}</p>}
      {children}
    </div>
  )
}
