import "server-only";

import { getAllPosts } from "src/app/data";
import type { PrevNextPosts } from "src/types/post";

export const getPrevNextPosts = async (slug: string): Promise<PrevNextPosts> => {
  const posts = await getAllPosts(["title", "slug", "excerpt"]);

  const index = posts.findIndex((p) => p.slug === slug);
  const isLatestPost = index === 0;
  const isOldestPost = posts.length - 1 === index;

  const prevPost = !isOldestPost ? posts[index + 1] : null;
  const nextPost = !isLatestPost ? posts[index - 1] : null;

  return {
    nextExcerpt: nextPost?.excerpt,
    nextSlug: nextPost?.slug,
    nextTitle: nextPost?.title,
    prevExcerpt: prevPost?.excerpt,
    prevSlug: prevPost?.slug,
    prevTitle: prevPost?.title,
  };
};
