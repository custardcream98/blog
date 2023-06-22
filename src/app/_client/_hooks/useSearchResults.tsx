import { searchPosts } from "src/lib/axios";
import type { SearchedPostCardData } from "src/types/searchedPosts";

import { useCallback, useEffect, useState } from "react";
import { utld } from "utility-class-components";

const ResultsMark = utld.mark`
  bg-accent-light
  dark:bg-accent-dark

  px-[0.1875rem]

  rounded-[0.3125rem]
`;

export const useSearchResults = (query: string) => {
  const [searchResults, setSearchResults] = useState<SearchedPostCardData[]>([]);

  const getSearchedPostCardData = useCallback(async (query: string) => {
    const searchedData = await searchPosts(query);

    const searchedResultCardsData: SearchedPostCardData[] = searchedData.map(
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
          };
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
        };
      },
    );

    return searchedResultCardsData;
  }, []);

  const getAndSetSearchedResultCardsData = useCallback(
    async (query: string) => {
      const searchedResultCardsData = await getSearchedPostCardData(query);
      setSearchResults(searchedResultCardsData);
    },
    [getSearchedPostCardData],
  );

  useEffect(() => {
    getAndSetSearchedResultCardsData(query);
  }, [query, getAndSetSearchedResultCardsData]);

  const clearSearchedResults = useCallback(() => setSearchResults([]), []);

  return { clearSearchedResults, searchResults };
};
