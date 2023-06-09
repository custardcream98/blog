// const MarkdownBodyStyle = styled.div`
//   --main-font-size: 1rem;
//   --main-heading-margin: 4rem;
//   --post-element-background-color: rgb(240, 240, 240);
//   --text-color: #121212;
//   --code-line-number-background-color: #dfdfdf; /* #292929 */
//   --accent-color: #0070f3; /* #3b96ff */
//   --background-color: #fcfcfc; /* #121212 */
//   --sub-text-color: rgb(140, 140, 140); /* rgb(177, 177, 177) */

//   pre[data-theme="light"],
//   code[data-theme="light"] {
//     display: initial;
//   }

//   pre[data-theme="dark"],
//   code[data-theme="dark"] {
//     display: none;
//   }

//   :is(.dark &) {
//     --post-element-background-color: #1e1e1e;
//     --text-color: #efefef;
//     --code-line-number-background-color: #292929;
//     --accent-color: #3b96ff;
//     --background-color: #121212;
//     --sub-text-color: rgb(177, 177, 177);

//     pre[data-theme="light"],
//     code[data-theme="light"] {
//       display: none;
//     }

//     pre[data-theme="dark"],
//     code[data-theme="dark"] {
//       display: initial;
//     }
//   }

//   @media (max-width: 800px) {
//     --main-font-size: 0.9rem;
//   }

//   -ms-text-size-adjust: 100%;
//   -webkit-text-size-adjust: 100%;

//   width: 100%;
//   margin-top: 2rem;
//   font-size: var(--main-font-size);
//   font-weight: 300;
//   line-height: 1.9;
//   word-wrap: break-word;
//   letter-spacing: 0.03rem;

//   a {
//     background-color: transparent;
//     color: #58a6ff;
//     text-decoration: none;
//   }
//   a:active,
//   a:hover {
//     outline-width: 0;
//     text-decoration: underline;
//   }
//   b,
//   strong {
//     font-weight: 700;
//   }
//   h1,
//   h2,
//   h3,
//   h4,
//   h5,
//   h6 {
//     font-weight: 700;
//     line-height: 1.25;
//     display: block;
//   }
//   h1 tt,
//   h1 code,
//   h2 tt,
//   h2 code,
//   h3 tt,
//   h3 code,
//   h4 tt,
//   h4 code,
//   h5 tt,
//   h5 code,
//   h6 tt,
//   h6 code {
//     padding: 0 0.2em;
//     font-size: inherit;
//   }

//   /* Scroll Target Margin */

//   h1:target,
//   h2:target,
//   h3:target,
//   h4:target,
//   h5:target,
//   h6:target {
//     scroll-margin-top: 60px;
//   }

//   /*
//     Semantic한 HTML을 위해 h1, h2는 쓰지 않고
//     h3부터만 사용합니다.
//   */

//   h3 {
//     margin: var(--main-heading-margin) 0 1rem 0;
//     padding-bottom: 0.3em;
//     font-size: calc(var(--main-font-size) * 2);
//     border-bottom: 1px solid #21262d;
//   }
//   h4 {
//     margin: calc(var(--main-heading-margin) * 0.8) 0 1rem 0;
//     padding-bottom: 0.3em;
//     font-size: calc(var(--main-font-size) * 1.6);
//     border-bottom: 1px solid #21262d;
//   }
//   h5 {
//     margin: calc(var(--main-heading-margin) * 0.8) 0 1rem 0;
//     font-size: calc(var(--main-font-size) * 1.3);
//   }
//   h6 {
//     margin: calc(var(--main-heading-margin) * 0.8) 0 1rem 0;
//     font-size: calc(var(--main-font-size) * 1.2);
//   }

//   p {
//     margin-bottom: calc(var(--main-heading-margin) * 0.5);
//   }

//   blockquote {
//     margin: 0 0 1rem 0;
//     padding: 1.5rem;
//     border-left: 0.2rem solid #f9bf00;
//     font-style: italic;
//     letter-spacing: 0.04rem;
//     border-radius: 4px;
//     background-color: var(--post-element-background-color);
//     color: var(--text-color);
//     font-size: 93%;
//     p {
//       margin: 0;
//     }
//   }

//   code,
//   tt {
//     font-family: "D2Coding";
//     padding: 0 0.4em;
//     margin: 0;
//     font-size: 0.85em;
//     vertical-align: 0.0725em;
//     color: rgb(203, 155, 34);
//   }

//   div[data-rehype-pretty-code-fragment] {
//     margin: 1rem 0;
//     background-color: var(--post-element-background-color);
//     border-radius: 4px;

//     counter-reset: codeblock;
//     line-height: 1;

//     overflow-x: auto;
//     overflow-y: hidden;
//     display: grid;

//     pre {
//       code {
//         padding: 0;
//         font-size: calc(var(--main-font-size) * 0.8);

//         &::before,
//         &::after {
//           content: "";
//           display: block;
//           width: 2rem;
//           padding: 0 0.7rem;
//           height: 0.65rem;
//           background-color: var(--code-line-number-background-color);
//         }
//         &::before {
//           border-top-left-radius: 4px;
//         }
//         &::after {
//           border-bottom-left-radius: 4px;
//         }
//         .line {
//           padding-right: 1rem;

//           &::before {
//             content: counter(codeblock);
//             counter-increment: codeblock;

//             display: inline-block;

//             width: 2rem;
//             padding: 0.3rem 0.4rem;

//             margin-right: 0.9rem;
//             text-align: right;

//             color: #717171;
//             background-color: var(--code-line-number-background-color);
//           }
//         }
//       }
//     }
//   }

//   img {
//     max-width: 100%;
//     image-resolution: from-image;
//     display: block;
//     margin: auto;
//   }

//   ol {
//     counter-reset: item;
//   }

//   & > ol,
//   & > ul {
//     margin-bottom: calc(var(--main-heading-margin) * 0.4);
//   }

//   li {
//     position: relative;
//     display: block;
//     margin: calc(var(--main-heading-margin) * 0.1) 0;
//     padding-left: 1rem;
//   }

//   ul > li {
//     margin-left: 1.5rem;
//     padding-left: 1.3rem;
//   }

//   ul > li > ul > li {
//     margin-left: 0.3rem;
//   }

//   ul > li::before {
//     content: " ";
//     position: absolute;
//     left: 0rem;
//     top: 0.8rem;
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background-color: var(--text-color);
//   }

//   ol > li::before {
//     content: counters(item, ".") " ";
//     font-weight: 500;
//     margin: 0 0.4rem 0.2rem 0.3rem;
//     counter-increment: item;
//   }

//   hr {
//     margin: 2rem 0;
//   }

//   a {
//     color: var(--accent-color);
//     transition: all 0.3s ease;
//     border-radius: 4px;

//     &:hover {
//       text-decoration: none;
//       padding: 0.1rem 0.3rem;
//       margin: -0.1rem -0.3rem;

//       color: var(--background-color);
//       background-color: var(--text-color);
//     }
//   }

//   .toc {
//     border-left: 2px solid var(--sub-text-color);
//     color: var(--text-color);
//     margin-bottom: 2rem;
//     padding: 0.3rem 0.8rem 0.3rem 0.7rem;
//     font-size: calc(var(--main-font-size) * 0.9);

//     .toc-link {
//       color: inherit;
//       &:hover {
//         color: var(--background-color);
//       }
//       &:hover::before {
//         background-color: var(--text-color);
//       }
//     }
//     .toc-level > .toc-item::before {
//       content: counters(item, ".") " ";
//       font-weight: 500;
//     }
//     .toc-level > .toc-item {
//       margin: calc(var(--main-heading-margin) * 0.06) 0;
//     }
//     > .toc-level > .toc-item {
//       padding-left: 0;
//     }
//   }

//   em {
//     font-family: "Nanum Myeongjo", serif;
//     font-style: italic;

//     &::before {
//       content: "'";
//       margin-left: 0.2rem;
//     }
//     &::after {
//       content: "'";
//       margin-right: 0.2rem;
//     }
//   }

//   iframe {
//     border: 2px solid var(--text-color);
//     border-radius: 10px;
//     margin: 0 auto;
//   }

//   p[class="iframe-container"] {
//     width: 100%;
//     overflow: auto;
//   }

//   table {
//     margin: auto;
//     max-width: 600px;
//     border-top: 1px solid var(--text-color);
//     border-bottom: 1px solid var(--text-color);
//     th,
//     td {
//       padding: 0.2rem 3rem;
//       @media (max-width: 800px) {
//         padding: 0.2rem 0.8rem;
//       }
//     }
//     thead {
//       background-color: #9b9b9b6f;
//       font-weight: 700;
//       th {
//         text-align: center;
//       }
//     }
//     tbody {
//       td {
//         text-align: start;
//         padding-left: 0.5rem;
//       }
//     }
//   }

//   figure {
//     margin: 15px 0;
//     figcaption {
//       font-weight: 300;
//       font-size: calc(var(--main-font-size) * 0.8);
//       font-style: italic;
//     }
//   }

//   .half {
//     display: inline-block;
//     width: calc(50% - 5px);
//   }
//   .half + .half {
//     margin-left: 10px;
//   }

//   blockquote,
//   div[data-rehype-pretty-code-fragment] {
//     @media (max-width: 600px) {
//       margin-left: -5vw;
//       margin-right: -5vw;
//       border-radius: 0;
//     }
//   }
// `;

type Props = {
  content: string;
};

export function MarkdownBody({ content }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
      className='post-content'
    />
  );
}