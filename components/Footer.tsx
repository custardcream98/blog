import styled from "styled-components";

const Container = styled.div`
  height: 5rem;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.footerShadow};
  a {
    color: ${(props) => props.theme.textColor};
    font-size: 0.7rem;
    font-weight: 300;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <footer>
      <Container>
        <a href="https://github.com/custardcream98">@custardcream98 Github</a>
      </Container>
    </footer>
  );
};

export default Footer;
