import { evaluate, EvaluateOptions, MDXComponents } from "next-mdx-remote-client/rsc"
import Image from "next/image"
import rehypePrettyCode, {
  Theme as RehypePrettyCodeTheme,
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"

import { externalLink, headingToStartFrom } from "./plugin"

const REHYPE_PRETTY_CODE_OPTIONS = {
  onVisitHighlightedLine(node) {
    if (!node.properties) {
      node.properties = {}
    }
    node.properties["data-highlighted-line"] = true
  },
} as const satisfies Partial<RehypePrettyCodeOptions>

const getMDXOptions = ({ codeTheme }: { codeTheme?: RehypePrettyCodeTheme }): EvaluateOptions => ({
  mdxOptions: {
    rehypePlugins: [
      [
        externalLink,
        {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ],
      rehypeSlug,
      [rehypePrettyCode, { ...REHYPE_PRETTY_CODE_OPTIONS, theme: codeTheme }],
      [headingToStartFrom, { startFrom: 3 }],
    ],
  },
  parseFrontmatter: true,
})

export const evaluateMDX = async ({
  source,
  components,
  codeTheme = "github-dark",
}: {
  source: string
  components?: MDXComponents
  codeTheme?: RehypePrettyCodeTheme
}) =>
  evaluate({
    source,
    options: getMDXOptions({ codeTheme }),
    components: {
      img: Image,
      ...components,
    },
  })
