import { readFile } from "fs/promises"
import { unstable_cache } from "next/cache"
import subsetFont from "subset-font"

import localFileCharacters from "@/assets/local-dynamic-font-targets/data.json"
import { getPostsList, getRawPostContent } from "@/lib/octokit/blog"

export const getSubsetFont = ({
  fontPath,
  targetFormat,
}: {
  fontPath: string
  targetFormat?: "sfnt" | "truetype" | "woff2" | "woff"
}) => {
  const cached = unstable_cache(
    async () => {
      const postsList = await getPostsList()

      const characters = new Set<string>([...JSON.stringify(postsList), ...localFileCharacters])

      await Promise.all(
        postsList.map(async ({ slug }) => {
          const content = await getRawPostContent({ slug })
          ;[...content].forEach((character) => {
            characters.add(character)
          })
        }),
      )

      const font = await readFile(fontPath)

      return subsetFont(font, [...characters].join(""), {
        targetFormat,
      })
    },
    [`font-${fontPath}`],
    {
      tags: ["fonts", `font-${fontPath}`],
    },
  )

  return cached()
}
