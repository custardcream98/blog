import { DateSpan, LinkDecorated } from "src/components";

import { ud, utld } from "utility-class-components";

type PagenationInfo = {
  isLastPage: boolean;
};

type Props = {
  index: number;
  maxPostCount: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function HeroPost({ index, maxPostCount, title, date, excerpt, slug }: Props) {
  const isLastPage = index === maxPostCount - 1;

  return (
    <ContentContainer isLastPage={isLastPage}>
      <LinkDecorated href={`/posts/${slug}`}>
        <Title>
          <TitleText>{title}</TitleText>
          <DateSpanForHeroPost date={date} />
        </Title>
        <Excerpt isLastPage={isLastPage}>
          <ExcerptText>{excerpt}</ExcerptText>
        </Excerpt>
      </LinkDecorated>
    </ContentContainer>
  );
}

const ContentContainer = utld.li<PagenationInfo>`
  w-full
  ${({ isLastPage }) => (isLastPage ? "mb-5" : "")}
`;

const Title = utld.h3`
  inline-block
  w-2/5
  h-full
  py-5
  mr-4
`;

const Excerpt = utld.span<PagenationInfo>`
  inline-block
  w-[calc(60%-1rem)]
  h-full
  align-top
  py-5
  text-[1rem]
  font-light
  leading-[1.5]
  
  ${({ isLastPage }) =>
    !isLastPage &&
    ud`
      border-b
      border-solid
      border-default-sub-light
      dark:border-default-sub-dark
    `}
`;

const ExcerptText = utld.p`
  w-full

  line-clamp-3
  text-[1rem]
  leading-[1.5]
  h-[4.5rem]  

  mobile:(
    text-[0.8125rem]
    h-[3.6875rem] 
  )
`;

const DateSpanForHeroPost = utld(DateSpan)`
  block
`;

const TitleText = utld.span`
  line-clamp-2
  text-[1.125rem]
  leading-[1.5]
  max-h-[3.375rem]

  mobile:text-[0.9375rem]
`;
