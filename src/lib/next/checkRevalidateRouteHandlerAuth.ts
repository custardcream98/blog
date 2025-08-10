import { NextRequest, NextResponse } from "next/server"

export const checkRevalidateRouteHandlerAuth = (request: NextRequest) => {
  const apiKey = request.headers.get("x-api-key")
  const validApiKey = process.env.REVALIDATE_API_KEY

  if (!apiKey || apiKey !== validApiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  return null
}
