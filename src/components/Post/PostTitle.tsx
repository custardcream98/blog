import CategoryBadges from "src/components/Common/CategoryBadges";
import DateSpan from "src/components/Common/DateSpan";
import { LinkDecorated } from "src/components/Common/styledComponents";
import { CoverImage } from "src/types/post";

import PostThumbnail from "./PostThumbnail";
import ViewsLikesCounter from "./ViewsLikesCounter";

import { Children } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  border-bottom: 3px solid #25282c;
  margin-bottom: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor};
  word-break: keep-all;
  font-weight: 800;
  font-size: 1.8em;
  line-height: 1.25;
`;
const SeriesName = styled(LinkDecorated)`
  margin-bottom: 5px;
  font-size: 1em;
  color: ${({ theme }) => theme.subTextColor};
`;

const DateSpanforTitle = styled(DateSpan)`
  margin-top: 1.1rem;
  font-weight: 400;
`;

const BadgeViewsLikesCounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  coverImage: CoverImage;
  title: string;
  category?: string[];
  date: string;
  series?: string;
};

function PostTitle({ coverImage, title, category, date, series }: Props) {
  return (
    <>
      <Container>
        {series && (
          <SeriesName
            href={{
              pathname: "/series/[series]",
              query: { series: encodeURI(series) },
            }}
          >
            {series}
          </SeriesName>
        )}
        <Title>{title}</Title>
        <DateSpanforTitle date={date} />
        <BadgeViewsLikesCounterContainer>
          {category && (
            <CategoryBadges>
              {Children.toArray(
                category.map((keyword) => <CategoryBadges.Badge category={keyword} />),
              )}
            </CategoryBadges>
          )}
          {process.env.NODE_ENV === "production" && <ViewsLikesCounter key={title} title={title} />}
        </BadgeViewsLikesCounterContainer>
      </Container>

      <PostThumbnail title={title} {...coverImage} />
    </>
  );
}

export default PostTitle;
