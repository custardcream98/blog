import { externalLink, headingToStartFrom } from "./plugin";

import rehypeToc from "@jsdevtools/rehype-toc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";

export const compileMd = async (source: string) => {
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(externalLink, { target: "_blank" })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(rehypePrettyCode, {
      onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
      theme: {
        dark: "material-default",
        light: "rose-pine-dawn",
      },
    })
    .use(remarkGfm)
    .use(headingToStartFrom, { startFrom: 3 })
    .use(rehypeStringify)
    .process(source);
  return result.toString();
};

export const compileMdForCache = async (source: string) => {
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(remarkGfm)
    .use(rehypeStringify)
    .process(source);
  return result.toString();
};
