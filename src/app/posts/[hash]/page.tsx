import { getAllPosts, getPostByHashedSlug } from "src/app/data";
import { sharedMetadata } from "src/app/sharedMetadata";
import { Container, MarkdownBody } from "src/components";
import { createPostDoc } from "src/lib/firebaseSetup/firebaseApps";
import generateRSSFeed from "src/lib/rss";
import markdownToHtml from "src/lib/utils/markdownToHtml";
import { getAllOgImages } from "src/lib/utils/ogImage";

import { Comments } from "./_client";
import { PostTitle, PrevNextPost } from "./_components";
import { getPrevNextPosts } from "./data";

import "src/styles/post.css";

import { type Metadata } from "next";
import { utld } from "utility-class-components";

type PostParams = {
  params: {
    hash: string;
  };
};

export const generateMetadata = async ({ params: { hash } }: PostParams): Promise<Metadata> => {
  const { title, date, excerpt, coverImage, category, series } = await getPostByHashedSlug(hash, [
    "title",
    "date",
    "slug",
    "excerpt",
    "coverImage",
    "category",
    "series",
  ]);

  const META_TITLE = title;
  const META_DESCRIPTION = excerpt;
  const META_KEYWORDS = series ? [...category, series] : category;
  const META_IMAGE = {
    alt: `${title} 포스트 썸네일`,
    height: 630,
    url: coverImage.darkThumbnail,
    width: 1200,
  };

  return {
    ...sharedMetadata,
    description: META_DESCRIPTION,
    keywords: META_KEYWORDS,
    openGraph: {
      ...sharedMetadata.openGraph,
      authors: "Shiwoo, Park",
      description: META_DESCRIPTION,
      images: META_IMAGE,
      publishedTime: date,
      tags: META_KEYWORDS,
      title: META_TITLE,
      type: "article",
      url: `/posts/${hash}`,
    },
    publisher: "Shiwoo, Park",

    title: META_TITLE,

    twitter: {
      ...sharedMetadata.twitter,
      description: META_DESCRIPTION,
      images: META_IMAGE,
      title: META_TITLE,
    },
  };
};

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

export default async function PostsDynamicPage({ params: { hash } }: PostParams) {
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

  const contentHtml = await markdownToHtml(post.content);

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

const PostSection = utld.section`
  w-full
`;

const PostContainer = utld(Container)`
  !max-w-[42.5rem]
`;
