import { ExternalLinkSvg } from "src/components/Svgs"
import { addToClipboard, getCurrentURL } from "src/utils"

import { utld } from "utility-class-components"

const sharePost = ({ url, text }: { url: string; text: string }) =>
  window.navigator.share({
    text,
    url,
  })

const generatePostShareHandler = (title: string) => async () => {
  const currentPostURL = getCurrentURL()
  const shareText = `FE 개발자 박시우의 기술 블로그 포스트\n"${title}" 읽어보세요! 👇👇\n`

  try {
    sharePost({
      text: shareText,
      url: currentPostURL,
    })
  } catch (e) {
    await addToClipboard(`${shareText}${currentPostURL}`)
    alert("📋 포스트 공유 링크가 복사됐습니다!")
  }
}

type Props = {
  title: string
}

export function PostActions({ title }: Props) {
  return (
    <Button type='button' onClick={generatePostShareHandler(title)}>
      <StyledExternalLinkSvg />
      공유하기
    </Button>
  )
}

const Button = utld.button`
  text-[0.8rem]
text-default-sub-light
dark:text-default-sub-dark

  flex
  items-center
`

const StyledExternalLinkSvg = utld(ExternalLinkSvg)`
  text-default-sub-light
  dark:text-default-sub-dark

  w-4
  h-4
  mr-2
`
