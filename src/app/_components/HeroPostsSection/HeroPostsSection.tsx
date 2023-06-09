"use client";

import { Container } from "src/components";

import { Paging } from "../Paging";

import { HeroPost } from "./HeroPost";

import PostByPageArr from "cache/postByPageArr.json";
import { useEffect, useRef } from "react";
import { utld } from "utility-class-components";

const PAGE_SCALE = PostByPageArr.length;

export function HeroPostsSection({ page }: { page?: string }) {
  const $target = useRef<HTMLDivElement>(null);
  const parsedPage = page ? parseInt(page, 10) : 1;
  const isValidPage = parsedPage > 0 && parsedPage <= PAGE_SCALE;
  const pageIndex = isValidPage ? parsedPage - 1 : 0;
  const posts = PostByPageArr[pageIndex];

  useEffect(() => {
    if (isValidPage) {
      $target.current?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [isValidPage, page]);

  return (
    <Container ref={$target}>
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
      <Paging pageScale={PAGE_SCALE} currentPage={parsedPage} />
    </Container>
  );
}

const HeroPostList = utld.ol`
  min-h-[37rem]
  mobile:min-h-[32.9375rem]
`;
