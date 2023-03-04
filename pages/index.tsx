import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import HeroPost from "components/Home/HeroPost";
import Meta from "components/Layout/Meta";
import Intro from "components/Home/Intro";
import Paging from "components/Common/Paging";
import { Container } from "components/Common/styledComponents";

import check404 from "lib/check404";
import PostByPageArr from "cache/postByPageArr.json";

import type PostType from "types/post";
import type { GetServerSideProps } from "next";

const PAGE_SCALE = PostByPageArr.length;

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
      <Meta type="default" />
      <Intro />
      <Container ref={heroPostsRef}>
        <h2 id="Posts_Title" className="sr-only">
          {"<Posts />"}
        </h2>
        <HeroPostList>
          {posts.map((post, i) => (
            <HeroPost
              key={post.slug}
              index={i}
              maxPostCount={posts.length}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          ))}
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

    return {
      props: {
        pageLength: PAGE_SCALE,
        posts:
          typeof page === "string"
            ? PostByPageArr[parseInt(page) - 1]
            : PostByPageArr[0],
      },
    };
  };
