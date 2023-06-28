import { externalLink, headingToStartFrom, imageSize } from "./plugin";

import rehypeToc from "@jsdevtools/rehype-toc";
import { type SerializeOptions } from "next-mdx-remote/dist/types";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const postMDXOptions: SerializeOptions = {
  mdxOptions: {
    rehypePlugins: [
      [
        externalLink,
        {
          target: "_blank",
        },
      ],
      rehypeSlug,
      rehypeToc,
      [
        rehypePrettyCode,
        {
          onVisitLine(node: { children: string | any[] }) {
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
        },
      ],
      [headingToStartFrom, { startFrom: 3 }],
      [imageSize, { mdxJsxElementTagName: ["img", "NextImage"] }],
    ],
    remarkPlugins: [remarkGfm],
  },
  parseFrontmatter: true,
};

export const postMDXOptionsForCache: SerializeOptions = {
  mdxOptions: { remarkPlugins: [remarkGfm] },
  parseFrontmatter: true,
};
