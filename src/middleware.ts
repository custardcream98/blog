import HASH_REVERSED_MAP from "cache/hashReversedSlug.json";
import SLUG_MAP from "cache/slug.json";
import { type NextRequest, NextResponse } from "next/server";

const HTTP_STATUS_CODE_MOVED_PERMANENTLY = 308;

const isKoreanSlug = (target: string): target is keyof typeof SLUG_MAP => target in SLUG_MAP;
const isHashedSlug = (target: string): target is keyof typeof HASH_REVERSED_MAP =>
  target in HASH_REVERSED_MAP;

/**
 * Post Slug를 한글 => hash값 => 영어로 변경함에 따라
 * 레거시 경로에 대응할 수 있도록 해주는 미들웨어
 */
export function middleware(request: NextRequest) {
  const {
    nextUrl: { pathname },
    url: baseUrl,
  } = request;

  const [, subDirectory, slug] = pathname.split("/");

  if (subDirectory !== "posts") return NextResponse.next();

  const decodedSlug = decodeURIComponent(slug);
  if (isKoreanSlug(decodedSlug)) {
    return NextResponse.redirect(
      new URL(`/posts/${SLUG_MAP[decodedSlug]}`, baseUrl),
      HTTP_STATUS_CODE_MOVED_PERMANENTLY,
    );
  } else if (isHashedSlug(decodedSlug)) {
    return NextResponse.redirect(
      new URL(`/posts/${HASH_REVERSED_MAP[decodedSlug]}`, baseUrl),
      HTTP_STATUS_CODE_MOVED_PERMANENTLY,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/posts/(.*)",
};
