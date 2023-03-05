import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import { LinkDecorated } from "components/Common/styledComponents";

import type { PropsWithChildren } from "react";

type NavItemProps = PropsWithChildren<{
  href: string;
}>;

type NavItemLinkDecoratedProps = {
  isActive: boolean;
};

const NavItem = ({ href, children }: NavItemProps) => {
  const hrefWithoutHash = (
    href.includes("#")
      ? href.slice(0, href.indexOf("#"))
      : href
  ).split("/")[1];

  const router = useRouter();
  const currentPath = router.pathname.split("/")[1];
  const isActive = currentPath === hrefWithoutHash;
  console.log(router);

  return (
    <NavItemLi>
      <Link href={href} passHref>
        <NavItemLinkDecorated isActive={isActive}>
          {children}
        </NavItemLinkDecorated>
      </Link>
    </NavItemLi>
  );
};

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 2rem;
  margin-right: 2rem;

  font-weight: 500;
  font-family: ${({ theme }) => theme.titleFont};

  @media (max-width: 800px) {
    gap: 0.5rem;
    margin-right: 0.5rem;
  }
`;
const NavItemLinkDecorated = styled(
  LinkDecorated
)<NavItemLinkDecoratedProps>`
  font-size: 1rem;
  color: ${({ theme, isActive }) =>
    isActive ? theme.textColor : theme.subTextColor};

  @media (max-width: 800px) {
    font-size: 0.8rem;
  }
`;
const NavItemLi = styled.li`
  display: flex;
  align-items: center;
`;

export { NavItem };
export default NavList;
