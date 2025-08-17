import { MiddlewareConfig, NextMiddleware, NextRequest, NextResponse } from "next/server"

/**
 * 지금은 revalidate 요청을 보호하기 위해 사용하는 미들웨어
 * 나중에 다른 로직이 추가될 가능성 있음
 */

const checkApiKey = (request: NextRequest) => {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  const apiKey = request.headers.get("x-api-key")
  const validApiKey = process.env.REVALIDATE_API_KEY

  if (!apiKey || apiKey !== validApiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  return NextResponse.next()
}

const middleware: NextMiddleware = (request) => checkApiKey(request)

export default middleware

export const config: MiddlewareConfig = {
  matcher: [
    {
      source: "/api/guarded/:path*",
      //   source: "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|rss).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
