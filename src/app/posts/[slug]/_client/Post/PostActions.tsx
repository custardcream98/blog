import { ExternalLinkSvg } from "src/components/Svgs"
import { addToClipboard, getCurrentURL } from "src/utils"

import { utld } from "utility-class-components"

const handleCopyPostLink = async () => {
  const currentPostURL = getCurrentURL()
  await addToClipboard(currentPostURL)
  alert("포스트 URL을 복사했습니다 😄")
}

export function PostActions() {
  return (
    <Button type='button' onClick={handleCopyPostLink}>
      <StyledExternalLinkSvg />
      URL 복사하기
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
