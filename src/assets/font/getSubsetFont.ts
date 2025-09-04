import { readFile, readdir, stat } from "fs/promises"
import { unstable_cache } from "next/cache"
import { join } from "path"
import subsetFont from "subset-font"

import { getPostsList, getRawPostContent } from "@/lib/octokit/blog"

const readFileAndGetCharacters = async (filePath: string) => {
  const text = await readFile(filePath, "utf-8")
  return [...text]
}

const gatherAllCharactersRecursive = async (
  {
    directory,
    filesToInclude,
    filesToExclude,
  }: { directory: string; filesToInclude?: RegExp; filesToExclude?: RegExp },
  textSet = new Set<string>(),
) => {
  if ((await stat(directory)).isFile()) {
    const chars = await readFileAndGetCharacters(directory)
    chars.forEach((char) => {
      textSet.add(char)
    })
    return textSet
  }

  const files = await readdir(directory)
  for (const file of files) {
    const filePath = join(directory, file)
    const stats = await stat(filePath)
    if (stats.isDirectory()) {
      textSet = await gatherAllCharactersRecursive(
        { directory: filePath, filesToInclude, filesToExclude },
        new Set([...textSet]),
      )
    } else if (
      (!filesToInclude || filesToInclude.test(filePath)) &&
      (!filesToExclude || !filesToExclude.test(filePath))
    ) {
      const chars = await readFileAndGetCharacters(filePath)
      chars.forEach((char) => {
        textSet.add(char)
      })
    }
  }

  return textSet
}

export const getSubsetFont = ({
  fontPath,
  targetFormat,
}: {
  fontPath: string
  targetFormat?: "sfnt" | "truetype" | "woff2" | "woff"
}) => {
  const cached = unstable_cache(
    async () => {
      const [postsList, textContentsFromFiles] = await Promise.all([
        getPostsList(),
        Promise.all([
          gatherAllCharactersRecursive({
            directory: join(process.cwd(), "src", "app"),
            filesToInclude: /\.(tsx|mdx)$/,
          }).then((characters) => [...characters]),

          gatherAllCharactersRecursive({
            directory: join(process.cwd(), "src", "components"),
            filesToInclude: /\.(tsx|mdx)$/,
            filesToExclude: /(.*__dev__.*)/,
          }).then((characters) => [...characters]),

          gatherAllCharactersRecursive({
            directory: join(process.cwd(), "src", "domains"),
            filesToInclude: /\.(tsx|mdx)$/,
          }).then((characters) => [...characters]),
        ]).then((arr) => arr.flat()),
      ])

      const characters = new Set<string>([...JSON.stringify(postsList), ...textContentsFromFiles])

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
