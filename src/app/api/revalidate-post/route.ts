import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // API 키 검증
  const apiKey = request.headers.get("x-api-key")
  const validApiKey = process.env.REVALIDATE_API_KEY

  if (!apiKey || apiKey !== validApiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  // URL에서 slug 파라미터 가져오기
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  revalidatePath(`/posts/${slug}`)

  return NextResponse.json({
    message: "Revalidated successfully",
    path: `/posts/${slug}`,
  })
}
