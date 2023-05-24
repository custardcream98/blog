import React from "react";
import styled from "styled-components";
import { LinkDecorated } from "src/components/Common/styledComponents";
import DateSpan from "src/components/Common/DateSpan";

type PagenationInfo = {
  index: number;
  maxPostCount: number;
};

const ContentContainer = styled.li<PagenationInfo>`
  width: 100%;
  margin-bottom: ${(props) =>
    props.index === props.maxPostCount - 1 ? "20px" : "0"};
`;

const Title = styled.h3`
  display: inline-block;
  width: 40%;
  height: 100%;
  padding: 20px 0;
  margin-right: 1rem;
`;

const ExcerptLink = styled(LinkDecorated)<PagenationInfo>`
  display: inline-block;
  width: calc(60% - 1rem);
  height: 100%;
  vertical-align: top;
  padding: 20px 0;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  border-bottom: ${(props) =>
    props.index === props.maxPostCount - 1
      ? "none"
      : "1px solid " + props.theme.subTextColor};
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

  @media (max-width: 780px) {
    font-size: 13px;
    height: 59px;
  }
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

  @media (max-width: 780px) {
    font-size: 15px;
  }
`;

type Props = {
  index: number;
  maxPostCount: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

const HeroPost = ({
  index,
  maxPostCount,
  title,
  date,
  excerpt,
  slug,
}: Props) => {
  return (
    <ContentContainer
      index={index}
      maxPostCount={maxPostCount}
    >
      <Title>
        <TitleLink href={`/posts/${slug}`}>
          {title}
        </TitleLink>
        <DateSpanForHeroPost date={date} />
      </Title>
      <ExcerptLink
        index={index}
        maxPostCount={maxPostCount}
        href={`/posts/${slug}`}
      >
        <Excerpt>{excerpt}</Excerpt>
      </ExcerptLink>
    </ContentContainer>
  );
};

export default HeroPost;
