import { externalLink, headingToStartFrom, imageSize } from "./plugin";

import rehypeToc from "@jsdevtools/rehype-toc";
import { type Element } from "hast";
import { type SerializeOptions } from "next-mdx-remote/dist/types";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const REHYPE_PRETTY_CODE_OPTOINS: Partial<RehypePrettyCodeOptions> = {
  onVisitHighlightedLine(node: Element) {
    if (!node.properties) {
      node.properties = {};
    }
    node.properties["data-highlighted-line"] = true;
  },
  onVisitLine(node: Element) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  theme: {
    dark: "material-default",
    light: "rose-pine-dawn",
  },
};

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
      [rehypePrettyCode, REHYPE_PRETTY_CODE_OPTOINS],
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