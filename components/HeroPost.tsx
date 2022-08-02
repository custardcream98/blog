import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { LinkDecorated } from "./styledComponents";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;

  p {
    flex: 2.5 1 0;
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.5;
  }

  @media (min-width: 800px) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  line-height: 1.3;
`;

const TitleContainer = styled.div`
  margin-right: 1rem;
  display: flex;
  flex: 1 1 0;
  div {
    margin: 1rem 2vw;
    height: auto;
    width: 0.1rem;
    background-color: ${(props) => props.theme.textColor};
  }

  @media (max-width: 800px) {
    flex-direction: column;
    div {
      margin: 1rem 1rem;
      height: 0.1rem;
      width: auto;
      background-color: ${(props) => props.theme.textColor};
    }
  }
`;

const Date = styled.span`
  margin-top: 0.2rem;
  font-weight: 300;
  font-size: 0.8rem;
  color: ${(props) => props.theme.subTextColor};
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
      <TitleContainer>
        <Title>
          <Link href={`/posts/${slug}`}>
            <LinkDecorated>{title}</LinkDecorated>
          </Link>
          <Date>{date}</Date>
        </Title>
        <div></div>
      </TitleContainer>
      <p>{excerpt}</p>
    </Container>
  );
};

export default HeroPost;
