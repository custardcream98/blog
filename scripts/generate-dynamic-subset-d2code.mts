import { fontRange, targets, parseCSS } from "font-range"
import { rm, mkdir, writeFile } from "fs/promises"
import { join } from "path"

const fontPath = join(process.cwd(), "src", "assets", "font", "D2Coding", "D2Coding.ttf")
const saveDir = join(process.cwd(), "src", "assets", "font", "D2Coding", "subset")

// Clean output dir to avoid stale files like D2Coding_NaN.woff2
await rm(saveDir, { recursive: true, force: true })
await mkdir(saveDir, { recursive: true })

await fontRange(fontPath, targets.korean, {
  saveDir,
  format: "woff2",
  // Use simple increasing index to avoid NaN from CSS src parsing
  fromCSS: "default",
  // Ensure the base name is stable and predictable
  nameFormat: "D2Coding_{INDEX}{EXT}",
}).catch((error) => {
  console.error("Failed to generate D2Coding dynamic subset:", error)
  process.exit(1)
})

// Build a CSS that references the generated subset files by unicode-range
const blocks = await parseCSS(saveDir, targets.korean)
const cssContent = blocks
  .map((block, index) => {
    return [
      "@font-face {",
      "  font-family: D2Coding;",
      `  src: url("./D2Coding_${index}.woff2") format("woff2");`,
      "  font-display: block;",
      "  font-style: normal;",
      `  unicode-range: ${block.unicodes};`,
      "}",
      "",
    ].join("\n")
  })
  .join("")

await writeFile(join(saveDir, "D2Coding.dynamic-subset.css"), cssContent, "utf8")
await rm(join(saveDir, "Noto Sans KR.css"))
