import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { IconContext } from "react-icons";
import { BsFillMoonFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";

import { LinkDecorated } from "../Common/styledComponents";
import BlogIcon from "../Common/BlogIcon";

import { isDarkAtom } from "../../lib/atoms";

const Header = styled.header`
  height: 50px;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  box-shadow: ${(props) => props.theme.navLineShadow};
  position: fixed;
  top: -1px;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  ::before {
    content: " ";
    position: absolute;
    inset: 0;
    background-color: ${(props) => props.theme.navBackgroundColor};
    backdrop-filter: blur(13px);
    z-index: -1;
  }
`;

const Nav = styled.nav`
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

const NavMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DarkmodeSwitch = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  margin: 0 0 0 0.25rem;
  padding: 3px;
  background-color: transparent;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: scale 0.2s ease;
  :hover {
    scale: 1.1;
  }
  :active {
    scale: 0.8;
  }
  @media (max-width: 800px) {
    position: fixed;
    width: 35px;
    height: 35px;
    bottom: 20px;
    right: 20px;
    padding: 6px;
    box-shadow: ${(props) => props.theme.darkmodeShadow};
    background-color: ${(props) => props.theme.navBackgroundColor};
    backdrop-filter: blur(13px);
  }
`;

const Title = styled.span`
  color: ${(props) => props.theme.textColor};
  font: 800 1rem ${(props) => props.theme.codingFont};
  letter-spacing: -0.03rem;
  margin-left: 7px;
  @media (max-width: 800px) {
    font-size: 0.9rem;
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

const NavItemLinkDecorated = styled(LinkDecorated)`
  font-size: 1rem;
  margin: 0 0.25rem;
  @media (max-width: 800px) {
    font-size: 0.8rem;
  }
`;
const NavItemLi = styled.li`
  display: flex;
  align-items: center;
`;

const NavItemWrapper = styled.div`
  display: flex;
`;

type NavItemProps = {
  href: string;
  content: string;
};

const NavItem = ({ href, content }: NavItemProps) => (
  <NavItemLi>
    <Link href={href} passHref>
      <NavItemLinkDecorated>{content}</NavItemLinkDecorated>
    </Link>
  </NavItemLi>
);

const Navigation = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleSwitch = () => setDarkAtom((prev) => !prev);
  const theme = useTheme();

  /* 화면 크기 확인 후 모바일에서는 Title을 숨깁니다. */
  const mediaQuery = "(max-width: 400px)";
  const [mediaQueryMatch, setMediaQueryMatch] = useState<MediaQueryList | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMediaQueryMatch((_) => window.matchMedia(mediaQuery));
  }, []);

  useEffect(() => {
    const insertSrOnlyClassByMediaQuery = (event: MediaQueryListEvent) => {
      const isMobile = event.matches;

      return setIsMobile((_) => isMobile);
    };

    if (!!mediaQueryMatch) {
      mediaQueryMatch.addEventListener("change", insertSrOnlyClassByMediaQuery);

      return () => mediaQueryMatch?.removeEventListener("change", insertSrOnlyClassByMediaQuery);
    }
  }, [isMobile, mediaQueryMatch]);

  return (
    <Header>
      <Container>
        <Nav>
          <Link href="/" passHref>
            <a>
              <LogoTitle>
                <BlogIcon color={theme.textColor} size={1} />
                <Title className={isMobile ? "sr-only" : ""}>Custardcream</Title>
                <span className="sr-only">: FE 개발자 박시우의 기술 블로그</span>
              </LogoTitle>
            </a>
          </Link>
          <NavItemWrapper>
            <NavMenu>
              <NavItem href="/#Posts_Title" content="Posts" />
              <NavItem href="/categories" content="Categories" />
              <NavItem href="/series" content="Series" />
              <NavItem href="/about" content="About" />
            </NavMenu>
            <article>
              <DarkmodeSwitch onClick={toggleSwitch}>
                <IconContext.Provider value={{ size: "100%" }}>
                  {isDark ? <BsFillMoonFill color="#e5c704" /> : <ImSun color="#e5c704" />}
                </IconContext.Provider>
              </DarkmodeSwitch>
            </article>
          </NavItemWrapper>
        </Nav>
      </Container>
    </Header>
  );
};

export default Navigation;
