import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Paging from "../components/Common/Paging";
import { Container, Title } from "../components/Common/styledComponents";
import HeroPost from "../components/Home/HeroPost";
import Intro from "../components/Home/Intro";
import Layout from "../components/Layout/Layout";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";

type Props = {
  postByPageArr: [Post[]];
};

const Index = ({ postByPageArr }: Props) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) - 1 || 0;

  const onPageChange = (to: number) => {
    router.push({
      pathname: "/",
      query: {
        page: to + 1,
      },
    });
  };

  return (
    <Layout>
      <Intro />
      <Container>
        <Title as="h2" id="Posts_Title">
          {"<Posts />"}
        </Title>
        <ol>
          {React.Children.toArray(
            postByPageArr[page].map((post, i) => (
              <HeroPost
                index={i}
                maxPostCount={postByPageArr[page].length}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))
          )}
        </ol>
        <Paging pageScale={postByPageArr.length} currentPage={page} onPageChange={onPageChange} />
      </Container>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);

  return {
    props: {
      postByPageArr: allPosts.reduce<[Post[]]>(
        (acc, post, i) => {
          if (i % 5 === 0 && i !== 0) acc.push([]);
          acc[Math.floor(i / 5)].push(post);
          return acc;
        },
        [[]]
      ),
    },
  };
};
