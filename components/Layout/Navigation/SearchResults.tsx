import { Children } from "react";
import styled from "styled-components";

import { SearchedPost } from "../../../interfaces/searchedPosts";
import { SearchResultStore } from "./SearchbarStore";
import SearchResultCard from "./SearchResultCard";

const ResultsWrapper = styled.ol`
  position: absolute;
  width: 100%;
  max-height: calc(100vh - 80px);
  overflow-y: scroll;
  top: 60px;
  background: ${({ theme }) =>
    theme.postElementBackgroundColor};
  box-shadow: ${({ theme }) => theme.subTextColor} 0px 1px
    8px 0px;

  padding: 0 15px;
  border-radius: 10px;
`;

type Props = {
  searchResults: SearchedPost[];
  visible: boolean;
};

export default function SearchResults({
  searchResults,
  visible,
}: Props) {
  return (
    <ResultsWrapper hidden={!visible}>
      {Children.toArray(
        searchResults.map((searchResult, i) => (
          <SearchResultStore.Provider
            value={{
              searchResult,
              isLast: searchResults.length - 1 === i,
            }}
          >
            <SearchResultCard />
          </SearchResultStore.Provider>
        ))
      )}
    </ResultsWrapper>
  );
}
