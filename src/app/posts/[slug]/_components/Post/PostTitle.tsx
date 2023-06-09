import { CategoryBadges, DateSpan, LinkDecorated } from "src/components";
import { type Categoires } from "src/constants/categoryTheme";
import { CoverImage } from "src/types/post";

import PostThumbnail from "./PostThumbnail";
import ViewsLikesCounter from "./ViewsLikesCounter";

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
        {series && <SeriesName href={`/series/${encodeURI(series)}`}>{series}</SeriesName>}
        <Title>{title}</Title>
        <DateSpanforTitle date={date} />
        <BadgeViewsLikesCounterContainer>
          {category && (
            <CategoryBadges>
              {category.map((keyword) => (
                <CategoryBadges.Badge key={keyword} category={keyword} />
              ))}
            </CategoryBadges>
          )}
          <ViewsLikesCounter key={title} title={title} />
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
  mb-[0.3125rem]
  text-[1rem]
  text-default-sub-light
  dark:text-default-sub-dark
`;

const DateSpanforTitle = utld(DateSpan)`
  !mt-[1.1rem]
  !font-normal
`;

const BadgeViewsLikesCounterContainer = utld.div`
  flex
  justify-between
  items-center
`;
