import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { SearchedPostCardData } from "../../@types/searchedPosts";
import { searchPosts } from "../axios";

const FETCH_DEBOUNCE_COOLTIME = 300;

const ResultsMark = styled.mark`
  background-color: ${({ theme }) => theme.accentColor};
  padding: 0 3px;

  border-radius: 5px;
`;

export default (query: string) => {
  const [searchResults, setSearchResults] = useState<
    SearchedPostCardData[]
  >([]);

  const queryCallback = useCallback(() => {
    if (!query) {
      return;
    }

    const inputTimeout = setTimeout(async () => {
      try {
        const searchedData = await searchPosts(query);

        const searchedResultCardsData = searchedData.map(
          ({ title, content, ...res }) => {
            if (typeof title === "object") {
              return {
                title: title.join(""),
                titleNode: (
                  <>
                    {title[0]}
                    <ResultsMark>{title[1]}</ResultsMark>
                    {title[2]}
                  </>
                ),
                contentNode: content,
                ...res,
              };
            }

            return {
              title,
              titleNode: title,
              contentNode: (
                <>
                  {content[0]}
                  <ResultsMark>{content[1]}</ResultsMark>
                  {content[2]}
                </>
              ),
              ...res,
            };
          }
        );

        setSearchResults(searchedResultCardsData);
      } catch (error) {
        console.log(error);
      }
    }, FETCH_DEBOUNCE_COOLTIME);

    return () => clearTimeout(inputTimeout);
  }, [query]);

  useEffect(queryCallback, [query]);

  const clearSearchedResults = () => setSearchResults([]);

  return { searchResults, clearSearchedResults };
};
