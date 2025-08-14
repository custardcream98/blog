import { getThumbnailImageResponse } from "@/lib/thumbnail/imageResponse"

export const alt = "shiwoo.dev"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function Image() {
  return getThumbnailImageResponse(null)
}
