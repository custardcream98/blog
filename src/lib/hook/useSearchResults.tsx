import { searchPosts } from "src/lib/axios";
import type { SearchedPostCardData } from "src/types/searchedPosts";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const FETCH_DEBOUNCE_COOLTIME = 300;

const ResultsMark = styled.mark`
  background-color: ${({ theme }) => theme.accentColor};
  padding: 0 3px;

  border-radius: 5px;
`;

const useSearchResults = (query: string) => {
  const [searchResults, setSearchResults] = useState<SearchedPostCardData[]>([]);

  const queryCallback = () => {
    if (!query) {
      return;
    }

    const inputTimeout = setTimeout(async () => {
      try {
        const searchedData = await searchPosts(query);

        const searchedResultCardsData = searchedData.map(({ title, content, ...res }) => {
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
        });

        setSearchResults(searchedResultCardsData);
      } catch (error) {
        console.log(error);
      }
    }, FETCH_DEBOUNCE_COOLTIME);

    return () => clearTimeout(inputTimeout);
  };

  useEffect(queryCallback, [query]);

  const clearSearchedResults = useCallback(() => setSearchResults([]), []);

  return { clearSearchedResults, searchResults };
};

export default useSearchResults;
