import { MiddlewareConfig, NextMiddleware, NextRequest, NextResponse } from "next/server"

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

const middleware: NextMiddleware = (request) => {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api/guarded")) {
    return checkApiKey(request)
  }

  return NextResponse.next()
}

export default middleware

export const config: MiddlewareConfig = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|rss).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
