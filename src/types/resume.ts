import type { DateYYMM } from "./string"

export type Period = {
  from: DateYYMM
  to?: DateYYMM
}

export type ResumeLink = {
  name: string
  url: string
}

export type ProjectTeam = string

export type Project = {
  title: string
  period: Period
  team?: ProjectTeam
  shortDescription: string
  links: ResumeLink[]
  description: string
  stacks: string[]
}

export type Career = {
  company: string
  period: Period
  position: string
  shortDescription?: string
  descriptions: string[]
  links: ResumeLink[]
}

export type ResumeSectionData = {
  title: string
  period: Period
  /**
   * 문구, 줄글로 표현됨
   */
  points?: string[]
  /**
   * 불렛 포인트로 표현됨
   */
  descriptions?: string[]
  links?: ResumeLink[]
}
