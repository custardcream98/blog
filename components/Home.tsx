import React from "react";
import styled from "styled-components";
import Intro from "../components/Intro";
import Post from "../interfaces/post";
import HeroPost from "./HeroPost";
import { Container } from "./styledComponents";
import Layout from "./Layout";

const Title = styled.h1`
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 3px solid #3a3e43;
`;

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  return (
    <Layout>
      <Intro />
      <Container>
        <Title>Posts</Title>
        <section>
          {React.Children.toArray(
            allPosts.map((post) => (
              <HeroPost
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))
          )}
        </section>
      </Container>
    </Layout>
  );
};

export default Home;
