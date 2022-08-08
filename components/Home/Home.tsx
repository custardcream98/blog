import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Intro from "./Intro";
import Post from "../../interfaces/post";
import HeroPost from "./HeroPost";
import { Container } from "../Common/styledComponents";
import Layout from "../Layout/Layout";
import Paging from "../Common/Paging";

const Title = styled.h1`
  margin-bottom: 2rem;
  padding-bottom: 0.2rem;
  border-bottom: 3px solid #3a3e43;
  font-size: 1.25rem;
  font-weight: 600;
`;

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postByPage, setPostByPage] = useState<[Post[]]>([[]]);

  const onPageChange = (to: number) => setCurrentPage((prev) => to);

  useEffect(() => {
    let counter = 0;
    let postByPageArr: [Post[]] = [[]];
    allPosts.forEach((post, index) => {
      if (index % 5 === 0 && index !== 0) {
        counter++;
        postByPageArr.push([]);
      }

      postByPageArr[counter].push(post);
    });

    setPostByPage((prev) => [...postByPageArr]);
    console.log(Math.ceil(allPosts.length / 5));
  }, []);

  return (
    <Layout>
      <Intro />
      <Container>
        <Title id="Posts_Title">{"<Posts />"}</Title>
        <section>
          {React.Children.toArray(
            postByPage[currentPage].map((post) => (
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
        <Paging
          pageScale={Math.ceil(allPosts.length / 5)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Container>
    </Layout>
  );
};

export default Home;
