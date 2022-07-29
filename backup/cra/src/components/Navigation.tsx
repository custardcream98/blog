import styled from "styled-components";

const NavBar = styled.nav`
  height: 2.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 0 0.8rem;
  div {
    color: white;
  }
`;

const Navigation = () => (
  <NavBar>
    <div>타이틀</div>
    <div style={{ display: "flex" }}>
      <div>링크</div>
      <div>링크</div>
    </div>
  </NavBar>
);

export default Navigation;
