import React from "react";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import Intro from "../components/Intro";
import Post from "../interfaces/post";
import HeroPost from "./HeroPost";
import { Container } from "./styledComponents";

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  return (
    <>
      <Navigation />
      <Intro />
      <Container>
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
    </>
  );
};

export default Home;
