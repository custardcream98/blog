import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { LinkDecorated } from "../Common/styledComponents";
import DateSpan from "../Common/DateSpan";

const ContentContainer = styled.li<{ index: number }>`
  width: 100%;
  margin-bottom: ${(props) => (props.index === 4 ? "20px" : "0")};
`;

const Title = styled.h3`
  display: inline-block;
  width: 40%;
  height: 100%;
  padding: 20px 0;
  margin-right: 1rem;
`;

const ExcerptLink = styled(LinkDecorated)`
  display: inline-block;
  width: calc(60% - 1rem);
  height: 100%;
  vertical-align: top;
  padding: 20px 0;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  border-bottom: 3px solid #25282c;
`;

const Excerpt = styled.p`
  width: 100%;

  /*
    Multi Line truncate
  */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  font-size: 16px;
  line-height: 1.5;
  height: 72px;
`;

const DateSpanForHeroPost = styled(DateSpan)`
  display: block;
`;

const TitleLink = styled(LinkDecorated)`
  /*
    Multi Line truncate
  */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  font-size: 18px;
  line-height: 1.5;
  max-height: 54px;
`;

type Props = {
  index: number;
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

const HeroPost = ({ index, title, coverImage, date, excerpt, slug }: Props) => {
  return (
    <ContentContainer index={index}>
      <Title>
        <Link href={`/posts/${slug}`} passHref>
          <TitleLink>{title}</TitleLink>
        </Link>
        <DateSpanForHeroPost date={date} />
      </Title>
      <Link href={`/posts/${slug}`} passHref>
        <ExcerptLink>
          <Excerpt>{excerpt}</Excerpt>
        </ExcerptLink>
      </Link>
    </ContentContainer>
  );
};

export default HeroPost;
