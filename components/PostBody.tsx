import React from "react";
import styled from "styled-components";

const MardownBody = styled.div`
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  width: 100%;
  margin: 2rem 0;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  font-size: 0.85em;
  line-height: 1.7;
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
  b strong {
    font-weight: 600;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
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
    margin: 0.67em 0;
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid #21262d;
  }
  h2 {
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid #21262d;
  }
  h3 {
    font-weight: 600;
    font-size: 1.25em;
  }
  h2 {
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid #21262d;
  }
  h3 {
    font-weight: 600;
    font-size: 1.25em;
  }
  h4 {
    font-weight: 600;
    font-size: 1em;
  }
  h5 {
    font-weight: 600;
    font-size: 0.875em;
  }
  h6 {
    font-weight: 600;
    font-size: 0.85em;
    color: #8b949e;
  }
  p {
    margin-top: 0;
    margin-bottom: 10px;
  }
  blockquote {
    margin: 0;
    padding: 0 1em;
    color: ${(props) => props.theme.textColor};
    border-left: 0.25em solid #f9dc00;
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
  }

  /* pre code {
    font-size: 100%;
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  } */

  div > pre > code {
    display: grid;
    background-color: transparent;
  }

  div[data-rehype-pretty-code-fragment] {
    padding: 0.7rem;
    margin: 0.7rem 0;
    background-color: #1e2228;
    overflow: auto;
    overflow-y: hidden;
  }
`;

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => (
  <MardownBody dangerouslySetInnerHTML={{ __html: content }} />
);

export default PostBody;
