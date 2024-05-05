import type { SearchedPostCardData, SearchedPostCardDataRaw } from "src/types/searchedPosts"

import { utld } from "utility-class-components"

const ResultsMark = utld.mark`
  bg-accent-light
  dark:bg-accent-dark

  px-[0.1875rem]

  rounded-[0.3125rem]
`

export const normalizeSearchedPosts = (
  searchedPosts: SearchedPostCardDataRaw[],
): SearchedPostCardData[] => {
  const searchedResultCardsData: SearchedPostCardData[] = searchedPosts.map(
    ({ title, content, ...res }) => {
      if (typeof title === "object") {
        return {
          contentNode: content,
          title: title.join(""),
          titleNode: (
            <>
              {title[0]}
              <ResultsMark>{title[1]}</ResultsMark>
              {title[2]}
            </>
          ),
          ...res,
        }
      }

      return {
        contentNode: (
          <>
            {content[0]}
            <ResultsMark>{content[1]}</ResultsMark>
            {content[2]}
          </>
        ),
        title,
        titleNode: title,
        ...res,
      }
    },
  )

  return searchedResultCardsData
}
