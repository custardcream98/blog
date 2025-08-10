import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key")
  const validApiKey = process.env.REVALIDATE_API_KEY

  if (!apiKey || apiKey !== validApiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

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
