import { LinkDecorated } from "src/components"

import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { utld } from "utility-class-components"

type NavItemProps = React.PropsWithChildren<{
  href: string
}>

function NavItem({ href, children }: NavItemProps) {
  const currentPathname = usePathname()
  const pathname = useMemo(() => parseUrl(href).pathname, [href])

  const isActive = currentPathname === pathname

  return (
    <NavItemLi>
      <NavItemLinkDecorated $isActive={isActive} href={href}>
        {children}
      </NavItemLinkDecorated>
    </NavItemLi>
  )
}

const Nav = utld.ul`
  flex
  items-center

  gap-8
  mr-8

  font-medium

  mobile:(
    gap-2
    mr-2
  )
`

const NavItemLinkDecorated = utld(LinkDecorated)<{
  $isActive: boolean
}>`
  text-[1rem]

  mobile:text-[0.8rem]

  ${({ $isActive }) =>
    $isActive
      ? "text-default-light dark:text-default-dark"
      : "text-default-sub-light dark:text-default-sub-dark"}
`

const NavItemLi = utld.li`
  flex
  items-center
`

export const NavList = Object.assign(Nav, {
  Item: NavItem,
})
