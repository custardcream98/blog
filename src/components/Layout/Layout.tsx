import Navigation from "./Navigation/Navigation";
import Footer from "./Footer";

import Head from "next/head";
import type { PropsWithChildren } from "react";
import { utld } from "utility-class-components";

const Wrapper = utld.div`
  flex
  flex-col
  min-h-[calc(100vh-50px)]
`;

const Main = utld.main`
  flex-1
  print:mt-[-2rem]
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
