import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { LinkDecorated } from "./styledComponents";
import DateSpan from "./DateSpan";

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  p {
    flex: 1.5 1 0;
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.5;
  }
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  line-height: 1.3;
  margin-right: 1rem;
  flex: 1 1 0;
`;

const Separator = styled.div`
  height: 1.3rem;
  width: 60%;
  border-bottom: 3px solid #25282c;
  margin-bottom: 1.3rem;
  align-self: flex-end;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

const HeroPost = ({ title, coverImage, date, excerpt, slug }: Props) => {
  return (
    <Container>
      <ContentContainer>
        <Title>
          <Link href={`/posts/${slug}`}>
            <LinkDecorated>{title}</LinkDecorated>
          </Link>
          <DateSpan date={date} />
        </Title>
        <Link href={`/posts/${slug}`} passHref={true}>
          <LinkDecorated as="p">
            <p>{excerpt}</p>
          </LinkDecorated>
        </Link>
      </ContentContainer>
      <Separator />
    </Container>
  );
};

export default HeroPost;
