import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { LinkDecorated } from "../Common/styledComponents";
import DateSpan from "../Common/DateSpan";

const ContentContainer = styled.li<{ index: number }>`
  width: 100%;
  height: 120px;
  margin-bottom: ${(props) => (props.index === 4 ? "20px" : "0")};
`;

const Title = styled.h3`
  display: inline-block;
  width: 40%;
  height: 100%;
  padding: 20px 0;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-right: 1rem;
  font-weight: 500;
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
  /* max-width: 300px; */
  width: 100%;
  height: 77px;
  word-break: initial;
  /* overflow: hidden; */
`;

const DateSpanForHeroPost = styled(DateSpan)`
  display: block;
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
      {/* <ContentContainer>
        <Title>
          <Link href={`/posts/${slug}`} passHref>
            <LinkDecorated>{title}</LinkDecorated>
          </Link>
          <DateSpan date={date} />
        </Title>
        <Link href={`/posts/${slug}`} passHref>
          <LinkDecorated>
            <p>{excerpt}</p>
          </LinkDecorated>
        </Link>
      </ContentContainer>
      <Separator /> */}
      <Title>
        <Link href={`/posts/${slug}`} passHref>
          <LinkDecorated>{title}</LinkDecorated>
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
