import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import HeroPost from "../components/Home/HeroPost";
import Meta from "../components/Layout/Meta";
import Intro from "../components/Home/Intro";
import Post from "../interfaces/post";
import Paging from "../components/Common/Paging";
import { Container, Title } from "../components/Common/styledComponents";

import { getAllPosts } from "../lib/api";
import check404 from "../lib/check404";

const HeroPostList = styled.ol`
  min-height: 592px;
  @media (max-width: 780px) {
    min-height: 527px;
  }
`;

type Props = {
  postByPageArr: [Post[]];
};

const Index = ({ postByPageArr }: Props) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) - 1 || 0;
  const heroPostsRef = useRef<HTMLDivElement>(null);

  const onPageChange = (to: number) => {
    router.push({
      pathname: "/",
      query: {
        page: to + 1,
      },
    });
  };

  useEffect(() => {
    if (router.query.page) {
      heroPostsRef.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [page]);

  check404();

  return (
    <>
      <Meta />
      <Intro />
      <Container ref={heroPostsRef}>
        <Title as="h2" id="Posts_Title">
          {"<Posts />"}
        </Title>
        <HeroPostList>
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
        </HeroPostList>
        <Paging pageScale={postByPageArr.length} currentPage={page} onPageChange={onPageChange} />
      </Container>
    </>
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
