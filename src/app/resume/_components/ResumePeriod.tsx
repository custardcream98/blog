import { utld } from "utility-class-components"

import type { Period } from "@/app/resume/_types"

import { convertYYMMToKorean } from "@/utils/string"

import { dimTextStyle } from "./styles"

export function ResumePeriod({ from, to }: Period) {
  if (to) {
    if (from === to) {
      return (
        <ResumePeriodContainer>
          <time dateTime={from}>{convertYYMMToKorean(from)}</time>
        </ResumePeriodContainer>
      )
    }

    return (
      <ResumePeriodContainer>
        <time dateTime={from}>{convertYYMMToKorean(from)}</time>
        <time dateTime={to}>{convertYYMMToKorean(to)}</time>
      </ResumePeriodContainer>
    )
  }

  return (
    <ResumePeriodContainer>
      <time dateTime={from}>{convertYYMMToKorean(from)}</time>
      <span>진행중</span>
    </ResumePeriodContainer>
  )
}

export const ResumePeriodContainer = utld.span`
  ${dimTextStyle}

  inline-block
  my-[0.2em]

  [&>time:first-child+time::before]:(
    content-['~']
    mx-[0.3em]
  )

  [&>time:first-child+span::before]:(
    content-['~']
    mx-[0.3em]
  )
`
