import { Container } from "src/components";

import { HeroPostItem } from "./_components/HeroPostsListItem";
import { Paging } from "./_components/Paging";
import { Intro } from "./_components";

import PostByPageArr from "cache/postByPageArr.json";
import { utld } from "utility-class-components";

type HomePageProps = {
  searchParams: {
    page?: string;
  };
};

const PAGE_SCALE = PostByPageArr.length;

export const POSTS_SECTION_ID = "post-cards-section";

export default function HomePage({ searchParams: { page } }: HomePageProps) {
  const parsedPage = page ? parseInt(page, 10) : 1;
  const validPage = parsedPage < 0 ? 1 : parsedPage > PAGE_SCALE ? PAGE_SCALE : parsedPage;
  const pageIndex = validPage - 1;
  const posts = PostByPageArr[pageIndex];

  return (
    <>
      <Intro />
      <Container id={POSTS_SECTION_ID}>
        <h2 className='sr-only'>Posts</h2>
        <HeroPostList>
          {posts.map((post) => (
            <HeroPostItem key={post.slug} {...post} />
          ))}
        </HeroPostList>
        <Paging currentPage={validPage} />
      </Container>
    </>
  );
}

const HeroPostList = utld.ol`
  pb-24
`;
