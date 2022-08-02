import React from "react";
import styled from "styled-components";
import Image from "next/image";
import CategoryBadge from "./CategoryBadge";
import imageLoader from "../lib/imageLoader";
import { Date } from "./styledComponents";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  border-bottom: 3px solid #25282c;
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

const DateforTitle = styled(Date)`
  margin-top: 1rem;
  font-weight: 400;
`;

type Props = {
  coverImage?: string;
  title: string;
  category?: string[];
  date: string;
};

const PostTitle = ({ coverImage, title, category, date }: Props) => (
  <TitleContainer>
    {coverImage && (
      <Image src={coverImage} layout="responsive" loader={imageLoader} />
    )}
    <Title>{title}</Title>
    <DateforTitle>{date}</DateforTitle>
    {category && (
      <BadgeContainer>
        {React.Children.toArray(
          category.map((keyword) => <CategoryBadge category={keyword} />)
        )}
      </BadgeContainer>
    )}
  </TitleContainer>
);

export default PostTitle;
