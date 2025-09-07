import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  revalidateTag("scraps")
  revalidateTag("scraps-images-list")

  revalidatePath("/scraps")

  revalidatePath("/scraps/[year]/[month]", "page")

  const { searchParams } = new URL(request.url)
  const year = searchParams.get("year")
  const month = searchParams.get("month")?.padStart(2, "0")

  if (year && month) {
    revalidatePath(`/scraps/${year}/${month}`)

    return NextResponse.json({
      message: "Revalidated successfully",
      path: `/scraps/${year}/${month}`,
    })
  }

  return NextResponse.json({
    message: "Revalidated successfully",
  })
}
