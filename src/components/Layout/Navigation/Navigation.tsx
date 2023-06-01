import BlogIcon from "src/components/Common/BlogIcon";
import { ResponsiveIconButton } from "src/components/Common/IconButton";
import LogoTitleSpan from "src/components/Common/LogoTitleSpan";
import Searchbar from "src/components/Searchbar";
import useWindowSize from "src/hook/useWindowSize";

import DarkmodeSwitch from "./DarkmodeSwitch";
import NavList, { NavItem } from "./NavList";

import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { utld } from "utility-class-components";

const TRANSLATE_DISSAPPEAR = "translate-y-[-51px]";
const TRANSLATE_APPEAR = "translate-y-[-1px]";

const Header = utld.header`
  h-[3.125rem]
  w-full
  print:hidden
`;

const Container = utld.div`
  w-full

  fixed

  z-[101]
  flex
  justify-center
  items-center

  transition-transform
  duration-300
  translate-y-[-1px]

  before:(
    absolute
    inset-0
    bg-nav-bg-light
    dark:bg-nav-bg-dark
    backdrop-blur
    z-[-1]
  )
`;

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

const LogoTitle = utld.h1`
  flex
  justify-start
  items-center

  font-mono
`;

const NavItemWrapper = utld.div`
  flex
`;

const StyledLogoTitleSpan = utld(LogoTitleSpan)`
  ml-[0.4375rem]
`;

function Navigation() {
  const [isSearchbarOn, setIsSearchbarOn] = useState(false);

  const { width } = useWindowSize();
  const isMobile = width <= 800;
  const isSmallScreen = width <= 400;

  const router = useRouter();
  const isPostRoute = useMemo(() => /\/posts\//g.test(router.route), [router]);

  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);

  const onScroll = useCallback(() => {
    if (!navRef.current || !isPostRoute) return;

    const currentScrollTop = document.documentElement.scrollTop;

    if (currentScrollTop < 50) {
      return;
    }

    if (lastScrollTopRef.current < currentScrollTop) {
      navRef.current.classList.remove(TRANSLATE_APPEAR);
      navRef.current.classList.add(TRANSLATE_DISSAPPEAR);
    } else {
      navRef.current.classList.remove(TRANSLATE_DISSAPPEAR);
      navRef.current.classList.add(TRANSLATE_APPEAR);
    }

    lastScrollTopRef.current = currentScrollTop;
  }, [isPostRoute]);

  useEffect(() => {
    if (!navRef.current) {
      return;
    }

    window.addEventListener("touchmove", onScroll);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const nav = useMemo(
    () => (
      <Nav>
        <Link href='/'>
          <LogoTitle>
            <BlogIcon className='text-default-light dark:text-default-dark' size={1} />
            <StyledLogoTitleSpan className={isSmallScreen ? "sr-only" : ""}>
              shiwoo.dev
            </StyledLogoTitleSpan>
            <span className='sr-only'>: FE 개발자 박시우의 기술 블로그</span>
          </LogoTitle>
        </Link>
        <NavItemWrapper>
          <NavList>
            <NavItem href='/#Posts_Title'>Posts</NavItem>
            <NavItem href='/categories'>Categories</NavItem>
            <NavItem href='/series'>Series</NavItem>
            <NavItem href='/resume'>About</NavItem>
          </NavList>
          <StyledResponsiveIconButton
            title='검색 버튼입니다.'
            type='button'
            mobileSize='22px'
            desktopSize='25px'
            icon={HiSearch}
            onClick={() => setIsSearchbarOn(true)}
          />
          {!isMobile && <DarkmodeSwitch />}
        </NavItemWrapper>
      </Nav>
    ),
    [isMobile, isSmallScreen],
  );

  return (
    <Header>
      <Container ref={navRef}>
        {nav}
        <Searchbar isSearchbarOn={isSearchbarOn} onSearchbarClose={() => setIsSearchbarOn(false)} />
      </Container>
      {isMobile && <DarkmodeSwitch />}
    </Header>
  );
}

const StyledResponsiveIconButton = utld(ResponsiveIconButton)`
  ml-1
`;

export default Navigation;
