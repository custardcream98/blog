import React from "react";
import Intro from "../components/Intro";
import Post from "../interfaces/post";
import HeroPost from "./HeroPost";
import { Container } from "./styledComponents";
import Layout from "./Layout";

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Home;
