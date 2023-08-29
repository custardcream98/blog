import { LogoTitleSpan } from "src/components";
import { ResponsiveIconButton } from "src/components/client";
import { LogoSvg } from "src/components/Svgs";
import { useIsMobie } from "src/hook";

import { DarkmodeSwitch } from "./DarkmodeSwitch";
import { NavList } from "./NavList";

import Link from "next/link";
import { HiSearch } from "react-icons/hi";
import { utld } from "utility-class-components";

export function NavigationBar({
  onSearchButtonClick,
}: {
  onSearchButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const isMobile = useIsMobie();

  return (
    <Nav>
      <Link href='/'>
        <H1>
          <LogoSvg className='h-4 w-4 text-default-light dark:text-default-dark' />
          <LogoTitleSpan className='ml-[0.4375rem] small:sr-only'>shiwoo.dev</LogoTitleSpan>
          <span className='sr-only'>: FE 개발자 박시우의 기술 블로그</span>
        </H1>
      </Link>
      <NavItemWrapper>
        <NavList>
          <NavList.Item href='/#post-cards-section'>Posts</NavList.Item>
          <NavList.Item href='/categories'>Categories</NavList.Item>
          <NavList.Item href='/series'>Series</NavList.Item>
          <NavList.Item href='/resume'>About</NavList.Item>
        </NavList>
        <ResponsiveIconButton
          className='ml-1'
          title='검색 버튼입니다.'
          type='button'
          mobileSize='22px'
          desktopSize='25px'
          icon={HiSearch}
          onClick={onSearchButtonClick}
        />
        {!isMobile && <DarkmodeSwitch className='absolute right-[-2.1875rem]' />}
      </NavItemWrapper>
    </Nav>
  );
}

const Nav = utld.nav`
  relative
  
  h-nav
  w-[85vw]
  max-w-800
  flex
  justify-between
  items-center

  mobile:w-[90vw]
`;

const H1 = utld.h1`
  flex
  justify-start
  items-center

  font-mono
`;

const NavItemWrapper = utld.div`
  flex
`;
