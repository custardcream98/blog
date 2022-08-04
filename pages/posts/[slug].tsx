import React from "react";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { Container } from "../../components/styledComponents";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import PostBody from "../../components/PostBody";
import PostTitle from "../../components/PostTitle";
import Comments from "../../components/Comments";
import Layout from "../../components/Layout";
import check404 from "../../lib/check404";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  check404();
  return (
    <Layout title={post.slug}>
      <Container>
        <PostTitle
          coverImage={post.coverImage}
          title={post.title}
          category={post.category}
          date={post.date}
        />
        <PostBody content={post.content} />
        <Comments title={post.title} />
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
    "content",
    "ogImage",
    "coverImage",
    "category",
  ]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
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
