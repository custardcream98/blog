import { ReactNode } from "react";
import styled from "styled-components";

import LinkToPost from "./LinkToPost";
import SearchResultCard, {
  SearchResultCardContent,
  SearchResultCardDate,
  SearchResultCardTitle,
} from "./SearchResultCard";

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
  children: ReactNode;
};

function SearchResults({ children, ...props }: Props) {
  return (
    <ResultsWrapper {...props}>{children}</ResultsWrapper>
  );
}

SearchResults.Item = SearchResultCard;
SearchResults.ItemLink = LinkToPost;
SearchResults.ItemTitle = SearchResultCardTitle;
SearchResults.ItemContent = SearchResultCardContent;
SearchResults.ItemDate = SearchResultCardDate;

export default SearchResults;