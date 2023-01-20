import { Children, useEffect, useRef } from "react";
import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
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
  pageLength: number;
  posts: PostType[];
};

const Index = ({ pageLength, posts }: Props) => {
  const router = useRouter();
  const { page: queryPage } = router.query;
  const page = parseInt(queryPage as string) || 1;

  if (page > pageLength) {
    router.push({ pathname: "/" });
    return <></>;
  }

  const heroPostsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (queryPage) {
      heroPostsRef.current?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [queryPage]);

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
            posts.map((post, i) => (
              <HeroPost
                index={i}
                maxPostCount={posts.length}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))
          )}
        </HeroPostList>
        <Paging pageScale={pageLength} currentPage={page} />
      </Container>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps =
  async (context) => {
    const { page } = context.query;

    const allPosts = getAllPosts([
      "title",
      "date",
      "slug",
      "coverImage",
      "excerpt",
    ]);

    const postByPageArr = allPosts.reduce<[PostType[]]>(
      (acc, post, i) => {
        if (i % 5 === 0 && i !== 0) acc.push([]);
        acc[Math.floor(i / 5)].push(post);
        return acc;
      },
      [[]]
    );

    return {
      props: {
        pageLength: postByPageArr.length,
        posts:
          typeof page === "string"
            ? postByPageArr[parseInt(page) - 1]
            : postByPageArr[0],
      },
    };
  };
