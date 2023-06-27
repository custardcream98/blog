import { getAllPosts, getPostBySlug } from "src/app/data";
import { Container } from "src/components";
import { FONT_D2_CODING, FONT_NOTO_SERIF_KR } from "src/fonts";
import { createPostDoc } from "src/lib/firebaseSetup/firebaseApps";
import { PostMDX } from "src/lib/mdx";
import generateRSSFeed from "src/lib/rss";
import { getAllOgImages } from "src/lib/thumbnails/ogImage";

import { Comments } from "./_client";
import { PostTitle, PrevNextPost } from "./_components";
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

  return posts.map(({ slug }) => ({
    slug,
  }));
};

export default async function PostsDynamicPage({ params: { slug } }: PostPageParams) {
  const post = await getPostBySlug(slug, [
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
        <PostMDX source={post.content} />
      </PostSection>
      <PrevNextPost key={slug} {...prevNextPosts} />
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
