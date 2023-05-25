import Navigation from "./Navigation/Navigation";
import Footer from "./Footer";

import Head from "next/head";
import type { PropsWithChildren } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px); // 뷰포트 높이 - Navbar 높이
`;

const Main = styled.main`
  flex-grow: 1;

  @media only print {
    margin-top: -2rem;
  }
`;

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Navigation />
      <Wrapper>
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </>
  );
}

export default Layout;
