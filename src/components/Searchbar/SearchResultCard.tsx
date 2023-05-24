import type { ReactNode } from "react";
import styled from "styled-components";

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

  @media (max-width: 400px) {
    .result-title-wrapper {
      flex-direction: column;
      margin-bottom: 10px;
    }
  }
`;

export const SearchResultCardTitle = styled.strong`
  display: block;
  font-size: 1.1rem;
  margin-bottom: 10px;
  line-height: 1.5;
  @media (max-width: 400px) {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
`;

export const SearchResultCardContent = styled.p`
  line-height: 1.4;
  font-size: 0.9rem;
  font-weight: 300;
  flex: 1;
  @media (max-width: 400px) {
    font-size: 0.8rem;
    line-height: 1.5;
  }
`;

export const SearchResultCardDate = styled.time`
  font-size: 0.8rem;
  font-weight: 300;
  white-space: nowrap;
  @media (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

type Props = {
  title: ReactNode;
  date: ReactNode;
  content: ReactNode;
  link: ReactNode;
  isLast: boolean;
};

const SearchResultCard = ({
  title,
  date,
  content,
  link,
  isLast,
}: Props) => {
  return (
    <ResultCardWrapper
      isLast={isLast}
      className="result-card-wrapper"
    >
      <div className="result-title-wrapper">
        {title}
        {date}
      </div>
      <div className="result-content-wrapper">
        {content}
        {link}
      </div>
    </ResultCardWrapper>
  );
};

export default SearchResultCard;
