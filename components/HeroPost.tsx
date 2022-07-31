import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  h1 {
    max-width: 40%;
    min-width: 25%;
    margin-right: 1rem;
    font-size: 1.2rem;
    line-height: 1.3;
    display: flex;
    div {
      margin: 1rem 2vw;
      height: auto;
      width: 0.1rem;
      background-color: ${(props) => props.theme.textColor};
    }
  }
  @media (max-width: 800px) {
    h1 {
      max-width: 40%;
      margin-right: 1rem;
      font-size: 1rem;
      line-height: 1.3;
      display: flex;
      flex-direction: column;
      div {
        margin: 1rem 1rem;
        height: 0.1rem;
        width: auto;
        background-color: ${(props) => props.theme.textColor};
      }
    }
  }
  p {
    flex-grow: 1;
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.5;
  }
`;

const LinkDecorated = styled.a`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
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
    <section>
      <Container>
        <h1>
          <Link href={`/posts/${slug}`}>
            <LinkDecorated>{title}</LinkDecorated>
          </Link>
          <div></div>
        </h1>
        <p>{excerpt}</p>
      </Container>
    </section>
  );
};

export default HeroPost;
