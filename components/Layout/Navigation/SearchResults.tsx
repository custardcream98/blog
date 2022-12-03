import {
  Children,
  MouseEventHandler,
  ReactNode,
} from "react";
import styled from "styled-components";

import { SearchedPost } from "../../../interfaces/searchedPosts";
import LinkToPost from "./LinkToPost";

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

const ResultsMark = styled.mark`
  background-color: ${({ theme }) => theme.accentColor};
  padding: 0 3px;

  border-radius: 5px;
`;

type ResultCardProps = {
  isLast: boolean;
};
const ResultCard = styled.li<ResultCardProps>`
  padding: 20px 0;

  ${({ isLast, theme }) =>
    !isLast &&
    "border-bottom: 1px solid " + theme.subTextColor};

  .result-title-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .result-content-wrapper {
    display: flex;
  }

  .result-title {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  .result-content {
    line-height: 1.4;
    font-size: 0.9rem;
    font-weight: 300;
    flex: 1;
  }
  .result-date {
    font-size: 0.8rem;
    font-weight: 300;
    white-space: nowrap;
  }

  @media (max-width: 400px) {
    .result-title-wrapper {
      flex-direction: column;
      margin-bottom: 10px;
    }
    .result-title {
      font-size: 0.9rem;
      margin-bottom: 5px;
    }
    .result-content {
      font-size: 0.8rem;
      line-height: 1.5;
    }
    .result-date {
      font-size: 0.7rem;
    }
  }
`;

type ResultCardResolverProps = {
  searchResult: SearchedPost;
  isLast: boolean;
};
const ResultCardResolver = ({
  searchResult,
  isLast,
}: ResultCardResolverProps) => {
  let Title: ReactNode;
  let Content: ReactNode;

  if (searchResult.matchedOne === "title") {
    Title = (
      <strong className="result-title">
        {searchResult.title[0]}
        <ResultsMark>{searchResult.title[1]}</ResultsMark>
        {searchResult.title[2]}
      </strong>
    );
    Content = (
      <p className="result-content">
        {searchResult.content}
      </p>
    );
  } else {
    Title = (
      <strong className="result-title">
        {searchResult.title}
      </strong>
    );
    Content = (
      <p className="result-content">
        {searchResult.content[0]}
        <ResultsMark>{searchResult.content[1]}</ResultsMark>
        {searchResult.content[2]}
      </p>
    );
  }

  return (
    <ResultCard isLast={isLast}>
      <div className="result-title-wrapper">
        {Title}
        <time className="result-date">
          {searchResult.date}
        </time>
      </div>
      <div className="result-content-wrapper">
        {Content}
        <LinkToPost
          slug={searchResult.slug}
          title={
            typeof searchResult.title === "string"
              ? searchResult.title
              : searchResult.title.join("")
          }
          isLast={isLast}
        />
      </div>
    </ResultCard>
  );
};

type Props = {
  searchResults: SearchedPost[];
  visible: boolean;
  onClickForCloseResults: MouseEventHandler;
};

export default function SearchResults({
  searchResults,
  visible,
  onClickForCloseResults,
}: Props) {
  return (
    <ResultsWrapper
      hidden={!visible}
      onClick={onClickForCloseResults}
    >
      {Children.toArray(
        searchResults.map((searchResult, i) => (
          <ResultCardResolver
            searchResult={searchResult}
            isLast={searchResults.length - 1 === i}
          />
        ))
      )}
    </ResultsWrapper>
  );
}
