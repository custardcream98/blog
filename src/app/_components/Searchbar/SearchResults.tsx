import LinkToPost from "./LinkToPost";
import SearchResultCard, {
  SearchResultCardContent,
  SearchResultCardDate,
  SearchResultCardTitle,
} from "./SearchResultCard";

import type { PropsWithChildren } from "react";
import { utld } from "utility-class-components";

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
`;

function SearchResults({ children, ...props }: PropsWithChildren) {
  return <ResultsWrapper {...props}>{children}</ResultsWrapper>;
}

SearchResults.Item = SearchResultCard;
SearchResults.ItemLink = LinkToPost;
SearchResults.ItemTitle = SearchResultCardTitle;
SearchResults.ItemContent = SearchResultCardContent;
SearchResults.ItemDate = SearchResultCardDate;

export default SearchResults;
