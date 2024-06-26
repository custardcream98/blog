import { ReactNode } from "react"

interface SearchedPostData {
  slug: string
  date: string
}

export interface SearchedPostCardDataRaw extends SearchedPostData {
  title: string | string[]
  content: string | string[]
  matchLength: number
}

export interface SearchedPostCardData extends SearchedPostData {
  title: string
  titleNode: ReactNode
  contentNode: ReactNode
}
