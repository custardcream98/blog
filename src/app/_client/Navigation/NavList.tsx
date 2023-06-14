import { LinkDecorated } from "src/components";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { utld } from "utility-class-components";

type NavItemProps = PropsWithChildren<{
  href: string;
}>;

function NavItem({ href, children }: NavItemProps) {
  const hrefWithoutHash = (href.includes("#") ? href.slice(0, href.indexOf("#")) : href).split(
    "/",
  )[1];

  const pathname = usePathname();
  const isActive = pathname === hrefWithoutHash;

  return (
    <NavItemLi>
      <NavItemLinkDecorated $isActive={isActive} href={href}>
        {children}
      </NavItemLinkDecorated>
    </NavItemLi>
  );
}

const Nav = utld.ul`
  flex
  items-center

  gap-8
  mr-8

  font-medium
  font-title

  mobile:(
    gap-2
    mr-2
  )
`;

const NavItemLinkDecorated = utld(LinkDecorated)<{
  $isActive: boolean;
}>`
  text-[1rem]

  mobile:text-[0.8rem]

  ${({ $isActive }) =>
    $isActive
      ? "text-default-light dark:text-default-dark"
      : "text-default-sub-light dark:text-default-sub-dark"}
`;

const NavItemLi = utld.li`
  flex
  items-center
`;

export const NavList = Object.assign(Nav, {
  Item: NavItem,
});
