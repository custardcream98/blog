import React from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../lib/atoms";
import { darkTheme, lightTheme } from "../../lib/theme";
import { createGlobalStyle } from "styled-components";
import Navigation from "./Navigation";
import Footer from "./Footer";

export const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
    box-sizing: border-box;
}

body {
    font-family: "Noto Sans", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
}
a {
    text-decoration: none;
    color: inherit;
}

/*
Webkit / Moz
*/

input, textarea, button{
  appearance: none;
  border-radius: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
}
input[type='radio'] {
  appearance: auto;
}
`;

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const Layout = ({ children, title, description, image, url }: Props) => {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Head>
        <title>{title ?? "Custardcream 개발 블로그"}</title>
        <meta
          property="og:title"
          content={title ?? "Custardcream 개발 블로그"}
        />
        <meta
          name="description"
          content={
            description ??
            "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다."
          }
        />
        <meta
          name="og:description"
          content={
            description ??
            "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다."
          }
        />
        <meta
          property="og:url"
          content={`https://custardcream.vercel.app/${url ?? ""}`}
        />
        <meta
          property="og:image"
          content={image ?? "/static/img/thumbnail.png"}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
