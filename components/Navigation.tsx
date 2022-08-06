import React from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { isDarkAtom } from "../lib/atoms";
import BlogIcon from "./BlogIcon";
import { LinkDecorated } from "./styledComponents";

const NavContainer = styled.div`
  height: 50px;
  width: 100vw;
  box-shadow: ${(props) => props.theme.navLineShadow};
  position: sticky;
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
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DarkmodeSwitch = styled.div`
  width: 50px;
  height: 30px;
  background-color: rgb(189, 189, 189);
  display: flex;
  justify-content: flex-start;
  border-radius: 50px;
  padding: 3px;
  margin-left: 0.25rem;
  cursor: pointer;
  &[data-ison="true"] {
    justify-content: flex-end;
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
`;

const Title = styled.span`
  /* background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: ${(props) => props.theme.mainGradient}; */
  color: ${(props) => props.theme.textColor};
  font: 800 1rem ${(props) => props.theme.codingFont};
  letter-spacing: -0.03rem;
  @media (max-width: 800px) {
    font-size: 0.7rem;
  }
`;

const LogoTitle = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  span {
    margin-left: 7px;
  }
`;

const NavItemLinkDecorated = styled(LinkDecorated)`
  font-size: 0.8rem;
  margin: 0 0.25rem;
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
  <li>
    <Link href={href}>
      <NavItemLinkDecorated>{content}</NavItemLinkDecorated>
    </Link>
  </li>
);

const Navigation = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleSwitch = () => setDarkAtom((prev) => !prev);

  const theme = useTheme();

  return (
    <NavContainer>
      <Nav>
        <Link href="/">
          <LogoTitle>
            <BlogIcon color={theme.textColor} size={1} />
            <Title>Custardcream</Title>
          </LogoTitle>
        </Link>
        <NavMenu>
          <NavItem href="/#Posts_Title" content="Posts" />
          <NavItem href="/about" content="About" />
          <DarkmodeSwitch data-ison={isDark} onClick={toggleSwitch}>
            <DarkmodeSwitchHandle layout transition={spring}>
              {isDark ? (
                <BsFillMoonFill color="#e5c704" />
              ) : (
                <ImSun color="#e5c704" />
              )}
            </DarkmodeSwitchHandle>
          </DarkmodeSwitch>
        </NavMenu>
      </Nav>
    </NavContainer>
  );
};

export default Navigation;
