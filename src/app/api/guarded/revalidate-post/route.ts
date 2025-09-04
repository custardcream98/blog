import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { revalidateFonts } from "@/lib/revalidation/revalidateFonts"

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  revalidateTag("posts-list")
  revalidateTag(`post:${slug}`)

  revalidatePath(`/posts/${slug}`)
  revalidatePath(`/api/og-image/${slug}`)
  revalidatePath("/rss")
  revalidatePath("/[[...year]]", "page")

  revalidateFonts()

  return NextResponse.json({
    message: "Revalidated successfully",
    path: `/posts/${slug}`,
  })
}
