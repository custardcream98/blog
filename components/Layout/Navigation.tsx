import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { useRecoilState } from "recoil";
import { IconContext } from "react-icons";
import { BsFillMoonFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";

import { LinkDecorated } from "../Common/styledComponents";
import BlogIcon from "../Common/BlogIcon";

import { isDarkAtom } from "../../lib/atoms";
import { useWindowSize } from "../../lib/hook/useWindowSize";
import { useRouter } from "next/router";

const Header = styled.header`
  height: 50px;
  width: 100%;
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
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleSwitch = () => setIsDark((prev) => !prev);
  const theme = useTheme();
  const windowSize = useWindowSize();

  const router = useRouter();

  const navRef = useRef<HTMLDivElement>(null);

  let lastScrollTop = 0;
  const onScroll = () => {
    const currentScrollTop = document.documentElement.scrollTop;

    if (windowSize.width! <= 400) {
      navRef.current!.style.top = lastScrollTop < currentScrollTop ? "-51px" : "-1px";
    }

    lastScrollTop = currentScrollTop;
  };

  useEffect(() => {
    if (/post/g.test(router.route)) {
      window.addEventListener("touchmove", onScroll);
      return () => window.removeEventListener("touchmove", onScroll);
    }
  }, [router, windowSize]);

  return (
    <Header>
      <Container ref={navRef} style={{ top: "-1px" }}>
        <Nav>
          <Link href="/" passHref>
            <a>
              <LogoTitle>
                <BlogIcon color={theme.textColor} size={1} />
                <Title className={windowSize.width! <= 400 ? "sr-only" : ""}>Custardcream</Title>
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
