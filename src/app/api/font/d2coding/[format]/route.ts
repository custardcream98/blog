import { NextResponse } from "next/server"
import { join } from "path"

import { getSubsetFont } from "@/assets/font/getSubsetFont"

export const runtime = "nodejs"
export const dynamic = "force-static"

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ format: "sfnt" | "truetype" | "ttf" | "woff2" | "woff" }> },
) => {
  const rawFormat = (await params).format
  const targetFormat = rawFormat === "ttf" ? "truetype" : rawFormat

  const font = await getSubsetFont({
    fontPath: join(process.cwd(), "src/assets/font/D2Coding/D2Coding.ttf"),
    targetFormat,
  })

  return new NextResponse(font, {
    headers: {
      "Content-Type": `font/${rawFormat}`,
    },
  })
}
