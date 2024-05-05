import { generateThumbnailBuffer, wrapHtmlString } from "src/lib/thumbnails/generateThumbnail"
import Template from "src/lib/thumbnails/Template"

/**
 * http://localhost:3000/api/test/og-img
 * http://localhost:3000/api/test/og-img?isImg=true
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get("title") || "테스트 타이틀? 테스트 타이틀! 이건: 테스트 타이틀"

  const isLight = searchParams.get("isLight") === "true"

  const isImg = searchParams.get("isImg") === "true"

  if (isImg) {
    const buffer = await generateThumbnailBuffer(
      Template({
        isLight,
        title,
      }),
    )

    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
      },
    })
  }

  const { renderToString } = await import("react-dom/server")

  const htmlString = renderToString(<Template title={title} isLight={isLight} />)

  return new Response(wrapHtmlString(htmlString), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  })
}
