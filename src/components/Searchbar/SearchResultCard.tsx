import type { ReactNode } from "react";
import { utld } from "utility-class-components";

type ResultCardWrapperProps = {
  isLast: boolean;
};

const ResultCardWrapper = utld.li<ResultCardWrapperProps>`
  py-5

  ${({ isLast }) =>
    !isLast ? "border-b border-solid border-default-sub-light dark:border-default-dark" : ""}
  
  [&>.result-title-wrapper]:(
    flex
    justify-between
  )

  [&>.result-content-wrapper]:flex

  mobile:[&>.result-title-wrapper]:(
    flex-col
    mb-[0.625rem]
  )
`;

export const SearchResultCardTitle = utld.strong`
  block
  text-[1.1rem]
  mb-2.5
  leading-[1.5]

  mobile:(
    text-[0.9rem]
    mb-[0.3125rem]
  )
`;

export const SearchResultCardContent = utld.p`
  leading-[1.4]
  text-[0.9rem]
  font-light
  flex-1

  mobile:(
    text-[0.8rem]
    leading-[1.5]
  )
`;

export const SearchResultCardDate = utld.time`
  text-[0.8rem]
  font-light
  whitespace-nowrap
  
  mobile:text-[0.7rem]
`;

type Props = {
  title: ReactNode;
  date: ReactNode;
  content: ReactNode;
  link: ReactNode;
  isLast: boolean;
};

function SearchResultCard({ title, date, content, link, isLast }: Props) {
  return (
    <ResultCardWrapper isLast={isLast} className='result-card-wrapper'>
      <div className='result-title-wrapper'>
        {title}
        {date}
      </div>
      <div className='result-content-wrapper'>
        {content}
        {link}
      </div>
    </ResultCardWrapper>
  );
}

export default SearchResultCard;
