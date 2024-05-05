import SearchResultCard, {
  SearchResultCardContent,
  SearchResultCardDate,
  SearchResultCardTitle,
} from "./SearchResultCard"

import { utld } from "utility-class-components"

const ResultsWrapper = utld.ol`
  absolute
  w-full
  max-h-[calc(100vh-80px)]
  overflow-y-scroll
  top-[3.75rem]
  bg-post-element-bg-light
  dark:bg-post-element-bg-dark

  px-[0.9375rem]
  rounded-lg
`

export const SearchResults = Object.assign(ResultsWrapper, {
  Item: SearchResultCard,
  ItemContent: SearchResultCardContent,
  ItemDate: SearchResultCardDate,
  ItemTitle: SearchResultCardTitle,
})
