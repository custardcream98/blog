export function ClientLogger() {
  if (typeof window === "undefined" || process.env.NODE_ENV === "development") return null

  console.clear()

  console.log("%c안녕하세요👋", "font-family: 'Noto Sans'; font-size: 16px; font-weight: 300")

  console.log(
    "%c프론트엔드 개발자",
    "display: inline-block; font-family: 'Noto Sans'; font-size: 24px; font-weight: 800; color: #0938F0;",
  )

  console.log(
    "%c박시우입니다.",
    "display: inline-block; font-family: 'Noto Sans'; font-size: 24px; font-weight: 800; background-image: linear-gradient(to right, #0938F0, #03B8F4); color: #ffffff; padding: 6px 8px 2px 11px;",
  )

  console.log(
    "%c이력서 : https://shiwoo.dev/resume/\n이메일 : custardcream@kakao.com",
    "font-family: 'Noto Sans'; font-size: 15px; font-weight: 500",
  )

  return null
}
