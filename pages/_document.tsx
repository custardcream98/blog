import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="icon" type="image/png" href="../static/icon.png" />
          <meta property="og:article:author" content="Custardcream98" />
          <meta property="og:type" content="website" />
          <meta
            name="google-site-verification"
            content="uEQH_kf2TBUnEK9r0_FjuR-nICr97lyWeNkTlQJt1XI"
          />
          <meta
            name="naver-site-verification"
            content="f97b3212948a936aa8bb8d14b7f84ba8d01f9cc1"
          />
          {this.props.styles}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [initialProps.styles, sheet.getStyleElement()],
    };
  } finally {
    sheet.seal();
  }
};
