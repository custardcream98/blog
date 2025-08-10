import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { checkRevalidateRouteHandlerAuth } from "@/lib/next/checkRevalidateRouteHandlerAuth"

export async function POST(request: NextRequest) {
  const check = checkRevalidateRouteHandlerAuth(request)

  if (process.env.NODE_ENV !== "development" && check) return check

  const { searchParams } = new URL(request.url)
  const year = searchParams.get("year")
  const month = searchParams.get("month")?.padStart(2, "0")

  if (!year || !month) {
    return NextResponse.json({ error: "year and month are required" }, { status: 400 })
  }

  revalidateTag("scraps")

  revalidatePath("/scraps")
  revalidatePath(`/scraps/${year}/${month}`)

  return NextResponse.json({
    message: "Revalidated successfully",
    path: `/scraps/${year}/${month}`,
  })
}
