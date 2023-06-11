import "server-only";

import { getAllPosts } from "src/app/data";

export interface PrevNextPosts {
  prevTitle?: string;
  prevHashedSlug?: string;
  prevExcerpt?: string;
  nextTitle?: string;
  nextHashedSlug?: string;
  nextExcerpt?: string;
}

export const getPrevNextPosts = async (hash: string): Promise<PrevNextPosts> => {
  const posts = await getAllPosts(["title", "slug", "excerpt"]);

  const index = posts.findIndex((p) => p.hash === hash);
  const isLatestPost = index === 0;
  const isOldestPost = posts.length - 1 === index;

  const prevPost = !isOldestPost ? posts[index + 1] : null;
  const nextPost = !isLatestPost ? posts[index - 1] : null;

  return {
    nextExcerpt: nextPost?.excerpt,
    nextHashedSlug: nextPost?.hash,
    nextTitle: nextPost?.title,
    prevExcerpt: prevPost?.excerpt,
    prevHashedSlug: prevPost?.hash,
    prevTitle: prevPost?.title,
  };
};
