import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import CategoryBadge from "./CategoryBadge";

const TitleContainer = styled.div`
  padding-top: 2rem;
  border-bottom: 3px solid #25282c;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-weight: 800;
  font-size: 1.9em;
  line-height: 1.25;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem 0;
`;

type Props = {
  coverImage?: string;
  title: string;
  category?: string[];
};

const PostTitle = ({ coverImage, title, category }: Props) => (
  <TitleContainer>
    {coverImage && <Image src={coverImage} layout="responsive" />}
    <Title>{title}</Title>
    <BadgeContainer>
      {category &&
        React.Children.toArray(
          category.map((keyword) => <CategoryBadge category={keyword} />)
        )}
    </BadgeContainer>
  </TitleContainer>
);

export default PostTitle;
