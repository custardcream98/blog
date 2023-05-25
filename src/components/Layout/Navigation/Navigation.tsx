import BlogIcon from "src/components/Common/BlogIcon";
import { ResponsiveIconButton } from "src/components/Common/IconButton";
import LogoTitleSpan from "src/components/Common/LogoTitleSpan";
import Searchbar from "src/components/Searchbar";
import useWindowSize from "src/lib/hook/useWindowSize";

import DarkmodeSwitch from "./DarkmodeSwitch";
import NavList, { NavItem } from "./NavList";

import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import styled, { useTheme } from "styled-components";

const Header = styled.header`
  height: 50px;
  width: 100%;

  @media only print {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  box-shadow: ${(props) => props.theme.navLineShadow};
  position: fixed;

  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: top ease 0.3s;

  top: -1px;

  ::before {
    content: " ";
    position: absolute;
    inset: 0;
    background-color: ${(props) => props.theme.navBackgroundColor};
    backdrop-filter: blur(8px);
    z-index: -1;
  }
`;

const Nav = styled.nav`
  position: relative;

  height: 50px;
  width: 85vw;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    width: 90vw;
  }
`;

const LogoTitle = styled.h1`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const NavItemWrapper = styled.div`
  display: flex;
`;

const StyledLogoTitleSpan = styled(LogoTitleSpan)`
  margin-left: 7px;
`;

function Navigation() {
  const [isSearchbarOn, setIsSearchbarOn] = useState(false);

  const theme = useTheme();
  const { width } = useWindowSize();

  const router = useRouter();

  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);

  const onScroll = useCallback(() => {
    if (!navRef.current) return;

    const currentScrollTop = document.documentElement.scrollTop;
    navRef.current.style.top = lastScrollTopRef.current < currentScrollTop ? "-51px" : "-1px";

    lastScrollTopRef.current = currentScrollTop;
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    if (/post/g.test(router.route) && width <= 400) {
      navRef.current.style.top = "-1px";
      window.addEventListener("touchmove", onScroll);
      return () => window.removeEventListener("touchmove", onScroll);
    }
  }, [router, width, onScroll]);

  const nav = useMemo(
    () => (
      <Nav>
        <Link href='/'>
          <LogoTitle>
            <BlogIcon color={theme.textColor} size={1} />
            <StyledLogoTitleSpan className={width <= 400 ? "sr-only" : ""}>
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
          <DarkmodeSwitch />
        </NavItemWrapper>
      </Nav>
    ),
    [theme, width],
  );

  return (
    <Header>
      <Container ref={navRef}>
        {nav}
        <Searchbar isSearchbarOn={isSearchbarOn} onSearchbarClose={() => setIsSearchbarOn(false)} />
      </Container>
    </Header>
  );
}

const StyledResponsiveIconButton = styled(ResponsiveIconButton)`
  margin-left: 0.25rem;
`;

export default Navigation;
