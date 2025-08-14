import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { checkRevalidateRouteHandlerAuth } from "@/lib/next/checkRevalidateRouteHandlerAuth"

export async function POST(request: NextRequest) {
  const check = checkRevalidateRouteHandlerAuth(request)

  if (process.env.NODE_ENV !== "development" && check) return check

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
  revalidatePath("/", "page")

  return NextResponse.json({
    message: "Revalidated successfully",
    path: `/posts/${slug}`,
  })
}
