import React from "react";
import styled from "styled-components";

const NavContainer = styled.div`
  height: 50px;
  width: 100vw;
  box-shadow: inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.1);
  position: sticky;
  top: 0;
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

const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin-left: 20px;
  }
`;

const Title = styled.h1`
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: ${(props) => props.theme.mainGradient};
  font: 800 23px "Source Code Pro", monospace;
`;

const Navigation = () => (
  <NavContainer>
    <Nav>
      <Title>{'<Custard is="sweet"/>'}</Title>
      <NavMenu>
        <a>블로그</a>
        <a>이력서</a>
      </NavMenu>
    </Nav>
  </NavContainer>
);

export default Navigation;
