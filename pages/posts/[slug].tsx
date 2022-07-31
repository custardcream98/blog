import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Navigation from "../../components/Navigation";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../lib/atoms";
import { darkTheme, lightTheme } from "../../lib/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "..";
import PostBody from "../../components/PostBody";
import Footer from "../../components/Footer";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const isDark = useRecoilValue(isDarkAtom);

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navigation />
      <PostBody content={post.content} />
      <Footer />
    </ThemeProvider>
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
    "author",
    "content",
    "ogImage",
    "coverImage",
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
