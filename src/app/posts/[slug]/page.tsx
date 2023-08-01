import { getAllPosts, getPostBySlug } from "src/app/data";
import { Container } from "src/components";
import { HydrateQueryClient } from "src/components/client";
import { FONT_D2_CODING, FONT_NOTO_SERIF_KR } from "src/fonts";
import { compilePostMDX } from "src/lib/mdx";
import generateRSSFeed from "src/lib/rss";
import { getAllOgImages } from "src/lib/thumbnails/ogImage";
import { getPostComments, getPostLikes, getPostViews } from "src/request/axios";
import {
  getUseGetPostCommentsQueryKey,
  getUseGetPostLikesQueryKey,
  getUseGetPostViewsQueryKey,
} from "src/request/query-keys";
import { getServerSideQueryClient } from "src/request/queryClient";

import { Comments, PostTitle, PrevNextPost } from "./_components";
import { createPostDoc, getPrevNextPosts } from "./data";
import type { PostPageParams } from "./types";

import { dehydrate } from "@tanstack/react-query";
import { utld } from "utility-class-components";

export { generateMetadata } from "./metadata";

const createAllPostDocs = (posts: { title: string }[]) =>
  Promise.all(posts.map((post) => createPostDoc(post.title)));

export const generateStaticParams = async () => {
  const posts = await getAllPosts(["slug", "title"]);

  if (process.env.NODE_ENV === "production") {
    const coverImages = await getAllOgImages(posts.map((post) => post.title));
    const darkTumbnails = coverImages.map(({ darkThumbnail }) => darkThumbnail);
    await generateRSSFeed(darkTumbnails);
    await createAllPostDocs(posts);
  }

  return posts.map(({ slug }) => ({
    slug,
  }));
};

export default async function PostsDynamicPage({ params: { slug } }: PostPageParams) {
  const { coverImage, title, category, date, series, content } = await getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "content",
    "category",
    "series",
    "coverImage",
  ]);

  const prevNextPosts = await getPrevNextPosts(slug);

  const postTitleForComments = title.replaceAll("/", ",");

  const postContent = await compilePostMDX(content);

  const queryClient = getServerSideQueryClient();
  await queryClient.prefetchQuery(getUseGetPostViewsQueryKey(title), () =>
    getPostViews({ title, viewedAt: Date.now() }),
  );
  await queryClient.prefetchQuery(getUseGetPostLikesQueryKey(title), () => getPostLikes({ title }));
  await queryClient.prefetchQuery(getUseGetPostCommentsQueryKey(postTitleForComments), () =>
    getPostComments({ title: postTitleForComments }),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateQueryClient state={dehydratedState}>
      <PostContainer>
        <PostSection>
          <PostTitle
            coverImage={coverImage}
            title={title}
            category={category}
            date={date}
            series={series}
          />
          {postContent}
        </PostSection>
        <PrevNextPost key={slug} {...prevNextPosts} />
        {(process.env.BLOG_ENV === "query" || process.env.NODE_ENV === "production") && (
          <Comments postTitle={postTitleForComments} />
        )}
      </PostContainer>
    </HydrateQueryClient>
  );
}

const FONTS = [FONT_D2_CODING.variable, FONT_NOTO_SERIF_KR.variable];

const PostContainer = utld(Container)`
  !max-w-[42.5rem]

  ${FONTS}
`;

const PostSection = utld.section`
  w-full
`;
