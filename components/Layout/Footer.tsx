import { useLayoutEffect, useState } from "react";
import styled from "styled-components";

import { LinkDecorated } from "components/Common/styledComponents";
import LogoTitleSpan from "components/Common/LogoTitleSpan";

const Container = styled.footer`
  width: 85vw;
  max-width: 800px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 0.9rem;
  font-weight: 300;
  margin: 5rem auto 2rem;

  @media (max-width: 800px) {
    margin-top: 3rem;
    width: 90vw;

    flex-direction: column;
    font-size: 11px;

    align-items: flex-start;
  }

  address {
    @media (max-width: 800px) {
      margin: 0.7rem 0 0 0;
    }
  }
  address ul {
    display: flex;
  }
  address ul li {
    color: ${({ theme }) => theme.subTextColor};
    font-size: inherit;
    font-weight: inherit;
  }
  address ul li + li {
    padding-left: 0.7rem;
  }
  small {
    color: ${({ theme }) => theme.subTextColor};
  }

  @media only print {
    display: none;
  }
`;

const StyledLogoTitleSpan = styled(LogoTitleSpan)`
  display: block;
  margin-bottom: 0.3rem;
`;

const Footer = () => {
  const [yearString, setYearString] = useState(2022);

  useLayoutEffect(() => {
    setYearString(new Date().getFullYear());
  }, []);

  return (
    <Container>
      <small>
        <StyledLogoTitleSpan>
          shiwoo.dev
        </StyledLogoTitleSpan>
        &copy; {yearString} custardcream98. All rights
        reserved.
      </small>
      <address>
        <ul>
          <li>
            <LinkDecorated
              href="https://github.com/custardcream98"
              target="_blank"
            >
              GitHub
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
            <LinkDecorated
              href="mailto:custardcream@kakao.com"
              target="_blank"
            >
              Email
            </LinkDecorated>
          </li>
          <li>
            <LinkDecorated href="/rss.xml" target="_blank">
              RSS
            </LinkDecorated>
          </li>
        </ul>
      </address>
    </Container>
  );
};

export default Footer;
