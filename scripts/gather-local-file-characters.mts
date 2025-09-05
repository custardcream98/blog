import { readFile, readdir, stat, writeFile } from "fs/promises"
import { join } from "path"

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

const main = async () => {
  const localFileCharacters = await Promise.all([
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
  ]).then((arr) => arr.flat())

  await writeFile(
    join(process.cwd(), "src", "assets", "local-dynamic-font-targets", "data.json"),
    JSON.stringify(localFileCharacters, null, 2),
  )
}

main()
