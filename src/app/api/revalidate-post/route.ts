import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  revalidatePath(`/posts/${slug}`)

  return NextResponse.json({ message: "Revalidated" })
}
