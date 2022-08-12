import React from "react";
import Image from "next/image";
import styled from "styled-components";
import imageLoader from "../../lib/imageLoader";
import CategoryBadge, { BadgeContainer } from "../Common/CategoryBadge";
import DateSpan from "../Common/DateSpan";

const TitleContainer = styled.div`
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

type Props = {
  coverImage?: string;
  title: string;
  category?: string[];
  date: string;
};

const PostTitle = ({ coverImage, title, category, date }: Props) => {
  return (
    <>
      <TitleContainer>
        <Title>{title}</Title>
        <DateSpanforTitle date={date} />
        {category && (
          <BadgeContainer>
            {React.Children.toArray(
              category.map((keyword) => <CategoryBadge category={keyword} />)
            )}
          </BadgeContainer>
        )}
      </TitleContainer>
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
