import { Container } from "src/components";

import { Paging } from "../Paging";

import { HeroPost } from "./HeroPost";

import PostByPageArr from "cache/postByPageArr.json";
import { utld } from "utility-class-components";

const PAGE_SCALE = PostByPageArr.length;
export const POSTS_SECTION_ID = "post-cards-section";

export function HeroPostsSection({ page }: { page?: string }) {
  const parsedPage = page ? parseInt(page, 10) : 1;
  const validPage = parsedPage < 0 ? 1 : parsedPage > PAGE_SCALE ? PAGE_SCALE : parsedPage;
  const pageIndex = validPage - 1;
  const posts = PostByPageArr[pageIndex];

  return (
    <Container id={POSTS_SECTION_ID}>
      <h2 className='sr-only'>{"<Posts />"}</h2>
      <HeroPostList>
        {posts.map((post, i) => (
          <HeroPost
            key={post.slug}
            index={i}
            maxPostCount={posts.length}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            hash={post.hash}
          />
        ))}
      </HeroPostList>
      <Paging currentPage={validPage} />
    </Container>
  );
}

const HeroPostList = utld.ol`
  min-h-[37rem]
  mobile:min-h-[32.9375rem]
`;
