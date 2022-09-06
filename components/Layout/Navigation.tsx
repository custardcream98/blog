import React from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { isDarkAtom } from "../../lib/atoms";
import BlogIcon from "../Common/BlogIcon";
import { LinkDecorated } from "../Common/styledComponents";

const Container = styled.header`
  height: 50px;
  width: 100%;
  box-shadow: ${(props) => props.theme.navLineShadow};
  position: sticky;
  position: -webkit-sticky;
  top: -1px;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const Nav = styled.nav`
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
  width: 50px;
  height: 30px;
  background-color: rgb(189, 189, 189);
  display: flex;
  justify-content: flex-start;
  border-radius: 50px;
  border: none;
  padding: 3px;
  margin: 0 0 0 0.25rem;
  cursor: pointer;
  &[data-ison="true"] {
    justify-content: flex-end;
  }

  @media (max-width: 800px) {
    width: 1.4rem;
    height: 1rem;
    padding: 0.09rem;
  }
`;

const DarkmodeSwitchHandle = styled(motion.div)`
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;

  @media (max-width: 800px) {
    width: 0.82rem;
    height: 0.82rem;
  }
`;

const Title = styled.span`
  color: ${(props) => props.theme.textColor};
  font: 800 1rem ${(props) => props.theme.codingFont};
  letter-spacing: -0.03rem;
  margin-left: 7px;
  @media (max-width: 800px) {
    font-size: 0.7rem;
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
    font-size: 0.75rem;
  }
`;
const NavItemLi = styled.li`
  display: flex;
  align-items: center;
`;

const NavItemWrapper = styled.div`
  display: flex;
`;

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

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

  return (
    <Container>
      <Nav>
        <Link href="/" passHref>
          <a>
            <LogoTitle>
              <BlogIcon color={theme.textColor} size={1} />
              <Title>Custardcream</Title>
              <span className="blind">: FE 개발자 박시우의 기술 블로그</span>
            </LogoTitle>
          </a>
        </Link>
        <NavItemWrapper>
          <NavMenu>
            <NavItem href="/#Posts_Title" content="Posts" />
            <NavItem href="/categories" content="Category" />
            <NavItem href="/series" content="Series" />
            <NavItem href="/about" content="About" />
          </NavMenu>
          <DarkmodeSwitch data-ison={isDark} onClick={toggleSwitch}>
            <DarkmodeSwitchHandle layout transition={spring}>
              {isDark ? (
                <BsFillMoonFill color="#e5c704" />
              ) : (
                <ImSun color="#e5c704" />
              )}
            </DarkmodeSwitchHandle>
          </DarkmodeSwitch>
        </NavItemWrapper>
      </Nav>
    </Container>
  );
};

export default Navigation;
