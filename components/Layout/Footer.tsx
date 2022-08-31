import styled from "styled-components";
import { LinkDecorated } from "../Common/styledComponents";

const Container = styled.footer`
  height: 100px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.footerShadow};
  font-size: 0.9rem;
  font-weight: 300;
  margin-top: 0.5rem;

  address ul {
    display: flex;
  }
  address ul li {
    color: ${(props) => props.theme.subTextColor};
    font-size: inherit;
    font-weight: inherit;
    padding-left: 0.3rem;
  }
  address ul li:nth-of-type(1) {
    padding-left: 0rem;
  }
  span {
    color: ${(props) => props.theme.subTextColor};
    margin-bottom: 0.4rem;
  }
`;

const Footer = () => {
  return (
    <Container>
      <span>
        &copy; {new Date().getFullYear()} custardcream98. All rights reserved.
      </span>
      <address>
        <ul>
          <li>
            <LinkDecorated
              href="https://github.com/custardcream98"
              target="_blank"
            >
              Github
            </LinkDecorated>
          </li>
          <li>
            <LinkDecorated
              href="https://www.linkedin.com/in/shi-woo-park-668b33147/"
              target="_blank"
            >
              LinkedIn
            </LinkDecorated>
          </li>
          <li>
            <LinkDecorated href="mailto:custardcream@kakao.com" target="_blank">
              Email
            </LinkDecorated>
          </li>
        </ul>
      </address>
    </Container>
  );
};

export default Footer;
