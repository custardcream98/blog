import { CategoryBadges, DateSpan, LinkDecorated } from "src/components";
import { type Categoires } from "src/constants/categoryTheme";
import type { CoverImage } from "src/types/post";

import { LikesCounter, PostActions, PostThumbnail, ViewsCounter } from "../../_client";

import { utld } from "utility-class-components";

type PostTitleProps = {
  coverImage: CoverImage;
  title: string;
  category?: Categoires[];
  date: string;
  series?: string;
};

export function PostTitle({ coverImage, title, category, date, series }: PostTitleProps) {
  return (
    <>
      <Container>
        {series && <SeriesName href={`/series/${encodeURIComponent(series)}`}>{series}</SeriesName>}
        <Title>{title}</Title>
        <DateActionWrapper>
          <DateSpanforTitle dateTime={date} />
          <PostActions />
        </DateActionWrapper>
        <BadgeViewsLikesCounterContainer>
          {category && (
            <CategoryBadges>
              {category.map((keyword) => (
                <CategoryBadges.Badge key={keyword} category={keyword} />
              ))}
            </CategoryBadges>
          )}
          {(process.env.BLOG_ENV === "query" || process.env.NODE_ENV === "production") && (
            <ViewsLikesCounterContainer key={title}>
              <ViewsCounter title={title} />
              <LikesCounter title={title} />
            </ViewsLikesCounterContainer>
          )}
        </BadgeViewsLikesCounterContainer>
      </Container>

      <PostThumbnail title={title} {...coverImage} />
    </>
  );
}

const Container = utld.div`
  flex
  flex-col

  w-full

  pt-8
  mb-4
  
  border-b-[3px]
  border-solid
  border-[#25282c]
`;

const Title = utld.h2`
  text-default-light
  dark:text-default-dark

  font-extrabold
  text-[1.8rem]
  leading-[1.25]

  break-keep
`;

const SeriesName = utld(LinkDecorated)`
  w-fit
  mb-[0.3125rem]
  text-[1rem]
  text-default-sub-light
  dark:text-default-sub-dark
`;

const DateActionWrapper = utld.div`
  flex
  items-center
  justify-between

  mt-[1.1rem]
`;

const DateSpanforTitle = utld(DateSpan)`
  !font-normal
  !mt-0
`;

const BadgeViewsLikesCounterContainer = utld.div`
  flex
  justify-between
  items-center
`;

const ViewsLikesCounterContainer = utld.div`
  flex
  items-center
  h-[3.643rem]
`;
