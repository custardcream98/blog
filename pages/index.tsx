import { Children, useEffect, useRef } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

import HeroPost from "../components/Home/HeroPost";
import Meta from "../components/Layout/Meta";
import Intro from "../components/Home/Intro";
import Paging from "../components/Common/Paging";
import {
  Container,
  Title,
} from "../components/Common/styledComponents";

import { getAllPosts } from "../lib/utils/posts";
import check404 from "../lib/check404";
import PostType from "../@types/post";

const HeroPostList = styled.ol`
  min-height: 592px;
  @media (max-width: 780px) {
    min-height: 527px;
  }
`;

type Props = {
  postByPageArr: [PostType[]];
};

const Index = ({ postByPageArr }: Props) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;

  if (page > postByPageArr.length) {
    router.push({ pathname: "/" });
    return <></>;
  }

  const heroPostsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (router.query.page) {
      heroPostsRef.current?.scrollIntoView({
        behavior: "auto",
        block: "center",
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
          {Children.toArray(
            postByPageArr[page - 1].map((post, i) => (
              <HeroPost
                index={i}
                maxPostCount={
                  postByPageArr[page - 1].length
                }
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))
          )}
        </HeroPostList>
        <Paging
          pageScale={postByPageArr.length}
          currentPage={page}
        />
      </Container>
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async (
  context
) => {
  console.log(context);

  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: {
      postByPageArr: allPosts.reduce<[PostType[]]>(
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
