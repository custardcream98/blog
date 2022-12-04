import { ReactNode, useContext } from "react";
import styled from "styled-components";

import LinkToPost from "./LinkToPost";
import { SearchResultStore } from "./SearchbarStore";

const ResultsMark = styled.mark`
  background-color: ${({ theme }) => theme.accentColor};
  padding: 0 3px;

  border-radius: 5px;
`;

type ResultCardWrapperProps = {
  isLast: boolean;
};
const ResultCardWrapper = styled.li<ResultCardWrapperProps>`
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

const SearchResultCard = () => {
  let Title: ReactNode;
  let Content: ReactNode;

  const {
    searchResult: { title, date, content, matchedOne },
    isLast,
  } = useContext(SearchResultStore);

  if (matchedOne === "title") {
    Title = (
      <strong className="result-title">
        {title[0]}
        <ResultsMark>{title[1]}</ResultsMark>
        {title[2]}
      </strong>
    );
    Content = <p className="result-content">{content}</p>;
  } else {
    Title = (
      <strong className="result-title">{title}</strong>
    );
    Content = (
      <p className="result-content">
        {content[0]}
        <ResultsMark>{content[1]}</ResultsMark>
        {content[2]}
      </p>
    );
  }

  return (
    <ResultCardWrapper isLast={isLast}>
      <div className="result-title-wrapper">
        {Title}
        <time className="result-date">{date}</time>
      </div>
      <div className="result-content-wrapper">
        {Content}
        <LinkToPost />
      </div>
    </ResultCardWrapper>
  );
};

export default SearchResultCard;
