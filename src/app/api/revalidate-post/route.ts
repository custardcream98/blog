import { revalidatePath, revalidateTag } from "next/cache"
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

  // 태그 기반 캐시 무효화 - 더 효율적
  revalidateTag("posts")

  // 기존 경로 기반 무효화도 함께 사용
  revalidatePath(`/posts/${slug}`)
  revalidatePath("/", "page")

  return NextResponse.json({
    message: "Revalidated successfully",
    path: `/posts/${slug}`,
  })
}
