import { postMDXOptions, postMDXOptionsForCache } from "./options"

import { compileMDX as NMRcompileMDX } from "next-mdx-remote/rsc"

export const compileMDX = async (source: string) => {
  const mdxSource = await NMRcompileMDX({
    options: postMDXOptions,
    source,
  })
  return mdxSource
}

export const compileMDXForCache = async (source: string) => {
  const mdxSource = await NMRcompileMDX({
    components: {
      NextImage: () => null,
    },
    options: postMDXOptionsForCache,
    source,
  })
  return mdxSource
}
