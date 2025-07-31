import { CurrentYear } from "@/components/CurrentYear.client"
import { Link } from "@/components/Link"

const FOOTER_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/custardcream98",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shi-woo-park-668b33147/",
  },
  {
    label: "Email",
    href: "mailto:custardcream@kakao.com",
  },
]

export const Footer = () => (
  <footer className='flex flex-col items-start gap-1 pt-8 pb-5 lg:flex-row lg:items-center lg:justify-between lg:gap-0'>
    <ul className='flex shrink-0 items-center gap-2'>
      {FOOTER_LINKS.map((link) => (
        <li key={link.label}>
          <Link className='text-foreground/70 text-sm' href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
    <span className='text-foreground/50 text-sm lg:text-end'>
      © <CurrentYear /> Shi Woo, Park (custardcream98)
      <br />
      All rights reserved.
    </span>
  </footer>
)
