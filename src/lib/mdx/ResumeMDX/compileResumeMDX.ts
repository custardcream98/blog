import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"

import { externalLink } from "@/lib/mdx-plugin"

import { resumeComponents } from "./components"

const REHYPE_PRETTY_CODE_OPTIONS = {
  theme: {
    dark: "material-theme",
    light: "rose-pine-dawn",
  },
}

export const resumeMDXOptions = {
  mdxOptions: {
    rehypePlugins: [
      [
        externalLink,
        {
          target: "_blank",
        },
      ],
      [rehypePrettyCode, REHYPE_PRETTY_CODE_OPTIONS],
    ],
  },
  parseFrontmatter: false,
}

export const compileResumeMDX = async (source: MDXRemoteProps["source"]) => {
  const { content } = await compileMDX({
    components: resumeComponents,
    // options: resumeMDXOptions,
    source,
  })

  return content
}
