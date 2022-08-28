import styled from "styled-components";

const MarkdownBody = styled.div`
  --main-font-size: 1.1rem;
  --main-heading-margin: 4rem;
  @media (max-width: 800px) {
    --main-font-size: 0.95rem;
  }

  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  width: 100%;
  margin-top: 2rem;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  font-size: var(--main-font-size);
  font-weight: 300;
  line-height: 1.8;
  word-wrap: break-word;

  a {
    background-color: transparent;
    color: #58a6ff;
    text-decoration: none;
  }
  a:active,
  a:hover {
    outline-width: 0;
    text-decoration: underline;
  }
  b,
  strong {
    font-weight: 500;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    line-height: 1.25;
  }
  h1 tt,
  h1 code,
  h2 tt,
  h2 code,
  h3 tt,
  h3 code,
  h4 tt,
  h4 code,
  h5 tt,
  h5 code,
  h6 tt,
  h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }
  h1 {
    margin: var(--main-heading-margin) 0 1rem 0;
    padding-bottom: 0.3em;
    font-size: calc(var(--main-font-size) * 2);
    border-bottom: 1px solid #21262d;
  }
  h2 {
    margin: calc(var(--main-heading-margin) * 0.5) 0 1rem 0;
    padding-bottom: 0.3em;
    font-size: calc(var(--main-font-size) * 1.6);
    border-bottom: 1px solid #21262d;
  }
  h3 {
    margin: calc(var(--main-heading-margin) * 0.5) 0 1rem 0;
    font-size: calc(var(--main-font-size) * 1.3);
  }
  h4 {
    margin: calc(var(--main-heading-margin) * 0.5) 0 1rem 0;
    font-size: calc(var(--main-font-size) * 1.2);
  }
  h5 {
    margin: calc(var(--main-heading-margin) * 0.5) 0 1rem 0;
    font-size: calc(var(--main-font-size) * 1.1);
  }
  h6 {
    margin: calc(var(--main-heading-margin) * 0.5) 0 1rem 0;
    font-size: calc(var(--main-font-size) * 1.05);
  }
  p {
    display: block;
    margin-bottom: calc(var(--main-heading-margin) * 0.23);
  }

  blockquote {
    margin: 0 0 1rem 0;
    padding: 0.6rem 0.6rem 0.6rem 0.9rem;
    color: ${(props) => props.theme.textColor};
    border-left: 0.2rem solid #f9bf00;
    font-style: italic;
    border-radius: 4px;
    background-color: #1e1e1e;
    color: white;
    font-size: 93%;
    p {
      margin: 0;
      code {
        font-size: 76.5%;
        vertical-align: middle;
      }
    }
  }

  code,
  tt {
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
      Liberation Mono, monospace;
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(110, 118, 129, 0.4);
    border-radius: 6px;
    vertical-align: text-top;
  }

  div > pre > code {
    display: grid;
    background-color: transparent;
    font-size: calc(var(--main-font-size)) * 0.85;
  }

  div[data-rehype-pretty-code-fragment] {
    margin: 1rem 0;
    background-color: #1e2228;
    border-radius: 4px;
    pre {
      overflow: auto;
      overflow-y: hidden;
      padding: 0.75rem 1rem;
      code {
        padding: 0;
        > span {
          padding-right: 1rem;
        }
      }
    }
  }

  img {
    max-width: 100%;
    image-resolution: from-image;
    display: flex;
    margin: auto;
    align-self: center;
  }

  ul > li::before {
    content: "•";
    display: inline-block;
    vertical-align: bottom;
    padding: 0 0.4rem 0 0.3rem;
    font-weight: 900;
  }

  ul > li {
    display: block;
    padding-left: 1rem;
    margin: 0.25rem 0;
  }

  ol {
    counter-reset: item;
  }

  & > ol,
  & > ul {
    margin: 0.5rem 0;
  }

  ol > li {
    display: block;
    padding-left: 1rem;
    margin: 0.25rem 0;
  }

  ol > li::before {
    content: counters(item, ".") " ";
    font-weight: 500;
    padding: 0 0.4rem 0.2rem 0.3rem;
    counter-increment: item;
  }

  hr {
    margin: 2rem 0;
  }

  .toc {
    width: fit-content;
    background-color: #1e1e1e;
    color: white;
    margin-bottom: 2rem;
    padding: 0.3rem 0.8rem 0.3rem 0;
    font-size: calc(var(--main-font-size) * 0.9);
    border-radius: 4px;
    a {
      color: white;
    }
    ol > li::before {
      content: counters(item, ".") " ";
      font-weight: 500;
      padding: 0 0.4rem 0.2rem 0rem;
    }
  }
  em {
    font-family: "Nanum Myeongjo", serif;
    font-style: italic;
    letter-spacing: -0.05rem;
    &::before {
      content: "'";
      margin-left: 0.2rem;
    }
    &::after {
      content: "'";
      margin-right: 0.2rem;
    }
  }
`;

export default MarkdownBody;
