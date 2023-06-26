import { getAllPosts, getPostByHashedSlug } from "src/app/data";
import { Container } from "src/components";
import { FONT_D2_CODING, FONT_NOTO_SERIF_KR } from "src/fonts";
import { createPostDoc } from "src/lib/firebaseSetup/firebaseApps";
import { compileMd } from "src/lib/md";
import generateRSSFeed from "src/lib/rss";
import { getAllOgImages } from "src/lib/thumbnails/ogImage";

import { Comments } from "./_client";
import { MarkdownBody, PostTitle, PrevNextPost } from "./_components";
import { getPrevNextPosts } from "./data";
import type { PostPageParams } from "./types";

import { utld } from "utility-class-components";

export { generateMetadata } from "./metadata";

export const generateStaticParams = async () => {
  const posts = await getAllPosts(["slug", "title"]);

  if (process.env.NODE_ENV === "production") {
    const coverImages = await getAllOgImages(posts.map((post) => post.title));
    await generateRSSFeed(coverImages.map((coverImage) => coverImage.darkThumbnail));
    Promise.all(posts.map((post) => createPostDoc(post.title)));
  }

  return posts.map(({ hash }) => ({
    hash,
  }));
};

export default async function PostsDynamicPage({ params: { hash } }: PostPageParams) {
  const post = await getPostByHashedSlug(hash, [
    "title",
    "date",
    "slug",
    "excerpt",
    "content",
    "category",
    "series",
    "coverImage",
  ]);

  const prevNextPosts = await getPrevNextPosts(hash);

  const contentHtml = await compileMd(post.content);

  const postTitle = post.title.replaceAll("/", ",");

  return (
    <PostContainer>
      <PostSection>
        <PostTitle
          coverImage={post.coverImage}
          title={post.title}
          category={post.category}
          date={post.date}
          series={post.series}
        />
        <MarkdownBody content={contentHtml} />
      </PostSection>
      <PrevNextPost key={post.hash} {...prevNextPosts} />
      <Comments postTitle={postTitle} />
    </PostContainer>
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
