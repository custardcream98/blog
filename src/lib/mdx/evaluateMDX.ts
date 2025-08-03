import { evaluate, EvaluateOptions, MDXComponents } from "next-mdx-remote-client/rsc"
import Image from "next/image"
import rehypePrettyCode, {
  Theme as RehypePrettyCodeTheme,
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"

import { externalLink } from "@/lib/mdx/plugin/externalLink"
import { headingToStartFrom } from "@/lib/mdx/plugin/headingToStartFrom"
import { imgToNextImagePlugin } from "@/lib/mdx/plugin/imgToNextImagePlugin"
import {
  tableOfContents,
  wrapTableOfContents,
} from "@/lib/mdx/plugin/tableOfContents/tableOfContents"

const REHYPE_PRETTY_CODE_OPTIONS = {
  onVisitHighlightedLine(node) {
    if (!node.properties) {
      node.properties = {}
    }
    node.properties["data-highlighted-line"] = true
  },
} as const satisfies Partial<RehypePrettyCodeOptions>

const getMDXOptions = ({
  codeTheme,
  shouldAddTableOfContents,
}: {
  codeTheme?: RehypePrettyCodeTheme
  shouldAddTableOfContents?: boolean
}): EvaluateOptions => ({
  mdxOptions: {
    rehypePlugins: [
      ...(process.env.NODE_ENV === "development" ? [] : [imgToNextImagePlugin]),
      [
        externalLink,
        {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ],
      rehypeSlug,
      ...(shouldAddTableOfContents ? [wrapTableOfContents] : []),
      [rehypePrettyCode, { ...REHYPE_PRETTY_CODE_OPTIONS, theme: codeTheme }],
      [headingToStartFrom, { startFrom: 3 }],
    ],
    remarkPlugins: [...(shouldAddTableOfContents ? [tableOfContents] : [])],
  },
  parseFrontmatter: true,
})

export const evaluateMDX = async ({
  source,
  components,
  codeTheme = "github-dark",
  shouldAddTableOfContents = false,
}: {
  source: string
  components?: MDXComponents
  codeTheme?: RehypePrettyCodeTheme
  shouldAddTableOfContents?: boolean
}) =>
  evaluate({
    source,
    options: getMDXOptions({ codeTheme, shouldAddTableOfContents }),
    components: {
      Image,
      ...components,
    },
  })
