import styled from "styled-components";
import { LinkDecorated } from "./styledComponents";

const Container = styled.div`
  height: 5rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.footerShadow};
  font-size: 0.7rem;
  font-weight: 300;
  div {
    margin-top: 0.5rem;
    a {
      color: ${(props) => props.theme.textColor};
      font-size: inherit;
      font-weight: inherit;
    }
    a:not(:nth-child(1)) {
      padding-left: 0.3rem;
    }
  }
`;

const Footer = () => {
  return (
    <footer>
      <Container>
        &copy; {new Date().getFullYear()} custardcream98. All rights reserved.
        <div>
          <LinkDecorated
            href="https://github.com/custardcream98"
            target="_blank"
          >
            Github
          </LinkDecorated>
          <LinkDecorated
            href="https://www.linkedin.com/in/shi-woo-park-668b33147/"
            target="_blank"
          >
            LinkedIn
          </LinkDecorated>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
