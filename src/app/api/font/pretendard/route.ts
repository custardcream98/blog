import { NextResponse } from "next/server"
import { join } from "path"

import { getSubsetFont } from "@/assets/font/getSubsetFont"

export const runtime = "nodejs"
export const dynamic = "force-static"

/**
 * 가변 폰트라서 woff2만 제공
 */
export const GET = async () => {
  const font = await getSubsetFont({
    fontPath: join(process.cwd(), "src/assets/font/Pretendard/PretendardVariable.woff2"),
  })

  return new NextResponse(font, {
    headers: {
      "Content-Type": `font/woff2`,
    },
  })
}
