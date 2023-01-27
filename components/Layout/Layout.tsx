import type { PropsWithChildren } from "react";
import Head from "next/head";
import styled from "styled-components";

import Navigation from "./Navigation/Navigation";
import Footer from "./Footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh - 50px
  ); // 뷰포트 높이 - Navbar 높이
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Navigation />
      <Wrapper>
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Layout;
