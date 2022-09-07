import React from "react";
import {
  getPostBySlug,
  getAllPosts,
  getOgImage,
  getPrevNextPosts,
} from "../../lib/api";
import { Container } from "../../components/Common/styledComponents";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import PostBody from "../../components/Post/PostBody";
import PostTitle from "../../components/Post/PostTitle";
import Comments from "../../components/Comment/Comments";
import PrevNextPostBtn from "../../components/Post/PrevNextPostBtn";
import Layout from "../../components/Layout/Layout";
import check404 from "../../lib/check404";
import { createPostDoc } from "../../lib/firebaseSetup/firebaseApps";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  check404();
  return (
    <Layout
      title={post.title}
      description={post.excerpt}
      image={post.coverImage}
      tags={post.category}
    >
      <Container>
        <section>
          <PostTitle
            coverImage={post.coverImage}
            title={post.title}
            category={post.category}
            date={post.date}
            series={post.series}
          />
          <PostBody content={post.content} />
        </section>
        <PrevNextPostBtn key={post.coverImage} post={post} />
        <Comments
          key={post.title.replaceAll("/", ",")}
          title={post.title.replaceAll("/", ",")}
        />
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "content",
    "ogImage",
    "coverImage",
    "category",
    "series",
  ]);

  const prevNextPosts = getPrevNextPosts(params.slug);

  await createPostDoc(post.title);

  const content = await markdownToHtml(post.content || "");

  let coverImage = "";
  if (process.env.NODE_ENV === "production")
    coverImage = await getOgImage(post.title);

  return {
    props: {
      post: {
        ...post,
        content,
        coverImage,
        prevTitle: prevNextPosts.prevTitle ?? null,
        prevSlug: prevNextPosts.prevSlug ?? null,
        prevExcerpt: prevNextPosts.prevExcerpt ?? null,
        nextTitle: prevNextPosts.nextTitle ?? null,
        nextSlug: prevNextPosts.nextSlug ?? null,
        nextExcerpt: prevNextPosts.nextExcerpt ?? null,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
