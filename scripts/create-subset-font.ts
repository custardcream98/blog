import { readFile, readdir, stat, writeFile } from "fs/promises"
import { join } from "path"
import subsetFont from "subset-font"

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

const getTargetTexts = async () => {
  return [
    ...new Set([
      ...(await gatherAllCharactersRecursive({
        directory: join(process.cwd(), "blog-posts", "posts"),
      })),
      ...(await gatherAllCharactersRecursive({
        directory: join(process.cwd(), "blog-posts", "scraps.json"),
      })),
      ...(await gatherAllCharactersRecursive({
        directory: join(process.cwd(), "src", "app"),
        filesToInclude: /\.(tsx|mdx)$/,
      })),
      ...(await gatherAllCharactersRecursive({
        directory: join(process.cwd(), "src", "components"),
        filesToInclude: /\.(tsx|mdx)$/,
        filesToExclude: /(.*__dev__.*)/,
      })),
      ...(await gatherAllCharactersRecursive({
        directory: join(process.cwd(), "src", "domains"),
        filesToInclude: /\.(tsx|mdx)$/,
      })),
    ]),
  ]
}

const createSubsetFont = async ({
  fontPath,
  targetTexts,
  outputPath,
}: {
  fontPath: string
  targetTexts: string[]
  outputPath: string
}) => {
  const font = await readFile(fontPath)
  const buffer = await subsetFont(font, targetTexts.join(""))

  console.log(
    `Created subset font at ${outputPath}, ${font.length / 1000}KB -> ${buffer.length / 1000}KB`,
  )

  await writeFile(outputPath, buffer)
}

const subsetPretendard = async () => {
  const texts = await getTargetTexts()

  await createSubsetFont({
    fontPath: join(process.cwd(), "src/assets/font/Pretendard/PretendardVariable.woff2"),
    targetTexts: texts,
    outputPath: join(process.cwd(), "src/assets/font/Pretendard/PretendardVariable.subset.woff2"),
  })
}

const subsetD2Coding = async () => {
  const texts = await getTargetTexts()

  await createSubsetFont({
    fontPath: join(process.cwd(), "src/assets/font/D2Coding/D2Coding.ttf"),
    targetTexts: texts,
    outputPath: join(process.cwd(), "src/assets/font/D2Coding/D2Coding.subset.ttf"),
  })
}

subsetPretendard()
subsetD2Coding()
