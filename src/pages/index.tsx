import { Container } from "src/components/Common";
import Paging from "src/components/Common/Paging";
import HeroPost from "src/components/Home/HeroPost";
import Intro from "src/components/Home/Intro";
import Meta from "src/components/Layout/Meta";
import type PostType from "src/types/post";

import PostByPageArr from "cache/postByPageArr.json";
import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { utld } from "utility-class-components";

const PAGE_SCALE = PostByPageArr.length;

type Props = {
  pageLength: number;
  posts: PostType[];
};

export default function HomePage({ pageLength, posts }: Props) {
  const router = useRouter();
  const { page: queryPage } = router.query;
  const page = parseInt(queryPage as string, 10) || 1;

  const heroPostsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (queryPage) {
      heroPostsRef.current?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [queryPage]);

  if (page > pageLength) {
    router.push({ pathname: "/" });
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    <>
      <Meta type='default' />
      <Intro />
      <Container ref={heroPostsRef}>
        <h2 id='Posts_Title' className='sr-only'>
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
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { page } = context.query;

  return {
    props: {
      pageLength: PAGE_SCALE,
      posts: typeof page === "string" ? PostByPageArr[parseInt(page, 10) - 1] : PostByPageArr[0],
    },
  };
};

const HeroPostList = utld.ol`
  min-h-[37rem]
  mobile:min-h-[32.9375rem]
`;
