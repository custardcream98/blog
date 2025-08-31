import { readFile, readdir, stat, writeFile } from "fs/promises"
import { join } from "path"
import subsetFont from "subset-font"

const gatherAllCharactersRecursive = async (dir: string, textSet = new Set<string>()) => {
  if ((await stat(dir)).isFile()) {
    const text = await readFile(dir, "utf-8")
    text.split("").forEach((char) => {
      textSet.add(char)
    })
    return textSet
  }

  const files = await readdir(dir)
  for (const file of files) {
    const filePath = join(dir, file)
    const stats = await stat(filePath)
    if (stats.isDirectory()) {
      textSet = await gatherAllCharactersRecursive(filePath, new Set([...textSet]))
    } else {
      const text = await readFile(filePath, "utf-8")
      text.split("").forEach((char) => {
        textSet.add(char)
      })
    }
  }

  return textSet
}

const getTargetTexts = async () => {
  return [
    ...new Set([
      ...(await gatherAllCharactersRecursive(join(process.cwd(), "blog-posts", "posts"))),
      ...(await gatherAllCharactersRecursive(join(process.cwd(), "blog-posts", "scraps.json"))),
      ...(await gatherAllCharactersRecursive(join(process.cwd(), "src", "app"))),
      ...(await gatherAllCharactersRecursive(join(process.cwd(), "src", "components"))),
      ...(await gatherAllCharactersRecursive(join(process.cwd(), "src", "domains"))),
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
