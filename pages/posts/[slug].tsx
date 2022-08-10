import React from "react";
import { getPostBySlug, getAllPosts, getOgImage } from "../../lib/api";
import { Container } from "../../components/Common/styledComponents";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import PostBody from "../../components/Layout/PostBody";
import PostTitle from "../../components/Layout/PostTitle";
import Comments from "../../components/Comment/Comments";
import Layout from "../../components/Layout/Layout";
import check404 from "../../lib/check404";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  check404();
  return (
    <Layout
      title={post.slug}
      description={post.excerpt}
      image={post.coverImage}
      url={post.slug}
    >
      <Container>
        <PostTitle
          coverImage={post.coverImage}
          title={post.title}
          category={post.category}
          date={post.date}
        />
        <PostBody content={post.content} />
        <Comments title={post.title.replaceAll("/", ",")} />
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
  ]);

  const content = await markdownToHtml(post.content || "");
  const coverImage = await getOgImage(post.slug);

  return {
    props: {
      post: {
        ...post,
        content,
        coverImage,
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
