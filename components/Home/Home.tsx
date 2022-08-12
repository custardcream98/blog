import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Intro from "./Intro";
import Post from "../../interfaces/post";
import HeroPost from "./HeroPost";
import { Container, Title } from "../Common/styledComponents";
import Layout from "../Layout/Layout";
import Paging from "../Common/Paging";

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
