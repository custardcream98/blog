import "server-only";

import { getDoc, getPostDocRef, setDoc } from "src/app/api/(firebase)/_utils";
import { getAllPosts } from "src/app/data";
import { encodeToPercentString } from "src/utils";

export interface PrevNextPosts {
  prevTitle?: string;
  prevSlug?: string;
  prevExcerpt?: string;
  nextTitle?: string;
  nextSlug?: string;
  nextExcerpt?: string;
}

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

const DEFAULT_POST_DOC_DATA = { likes: 0, views: [] };

export const createPostDoc = async (title: string) => {
  const encodedTitle = encodeToPercentString(title);

  const postDocRef = getPostDocRef(encodedTitle);
  const { exists: isDocExists } = await getDoc(postDocRef);

  if (!isDocExists) {
    await setDoc(postDocRef, DEFAULT_POST_DOC_DATA);
  }
};
