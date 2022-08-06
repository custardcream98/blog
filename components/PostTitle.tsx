import React from "react";
import styled from "styled-components";
import CategoryBadge from "./CategoryBadge";
import { DateSpan } from "./styledComponents";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  border-bottom: 3px solid #25282c;
  width: 100%;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-weight: 800;
  font-size: 1.8em;
  line-height: 1.25;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

const DateSpanforTitle = styled(DateSpan)`
  margin-top: 1rem;
  font-weight: 400;
`;

const Thumbnail = styled.img`
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
    <TitleContainer>
      {coverImage && <Thumbnail src={coverImage} alt="thumbnail" />}
      <Title>{title}</Title>
      <DateSpanforTitle>{date}</DateSpanforTitle>
      {category && (
        <BadgeContainer>
          {React.Children.toArray(
            category.map((keyword) => <CategoryBadge category={keyword} />)
          )}
        </BadgeContainer>
      )}
    </TitleContainer>
  );
};

export default PostTitle;
