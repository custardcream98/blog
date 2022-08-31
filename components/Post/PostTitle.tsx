import React from "react";
import Image from "next/image";
import styled from "styled-components";
import imageLoader from "../../lib/imageLoader";
import CategoryBadge, { BadgeContainer } from "../Common/CategoryBadge";
import DateSpan from "../Common/DateSpan";
import ViewsLikesCounter from "./ViewsLikesCounter";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  border-bottom: 3px solid #25282c;
  margin-bottom: 1rem;
  width: 100%;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  word-break: keep-all;
  font-weight: 800;
  font-size: 1.8em;
  line-height: 1.25;
`;

const DateSpanforTitle = styled(DateSpan)`
  margin-top: 1.1rem;
  font-weight: 400;
`;

const Thumbnail = styled(Image)`
  width: 100%;
`;

const BadgeViewsLikesCounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  coverImage?: string;
  title: string;
  category?: string[];
  date: string;
};

const PostTitle = ({ coverImage, title, category, date }: Props) => {
  return (
    <>
      <Container>
        <Title>{title}</Title>
        <DateSpanforTitle date={date} />
        <BadgeViewsLikesCounterContainer>
          {category && (
            <BadgeContainer>
              {React.Children.toArray(
                category.map((keyword) => <CategoryBadge category={keyword} />)
              )}
            </BadgeContainer>
          )}
          <ViewsLikesCounter title={title} />
        </BadgeViewsLikesCounterContainer>
      </Container>
      {coverImage && (
        <Thumbnail
          src={coverImage}
          alt="thumbnail"
          priority={true}
          width="1200px"
          height="630px"
          loader={imageLoader}
        />
      )}
    </>
  );
};

export default PostTitle;
