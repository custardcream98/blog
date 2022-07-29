import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import { getAllPosts } from "../../src/utils/mdx";

export default function BlogPage({ posts }) {
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <div>
        {posts.map((frontMatter) => {
          return (
            <Link href={`/blog/${frontMatter.slug}`} passHref>
              <div>
                <h1 className="title">{frontMatter.title}</h1>
                <p className="summary">{frontMatter.excerpt}</p>
                <p className="date">
                  {dayjs(frontMatter.publishedAt).format("MMMM D, YYYY")}{" "}
                  &mdash; {frontMatter.readingTime}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const articles = (await getAllPosts()) as unknown as any[];

  articles
    .map((article) => article.data)
    .sort((a, b) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1;
      if (a.data.publishedAt < b.data.publishedAt) return -1;

      return 0;
    });

  return {
    props: {
      posts: articles.reverse(),
    },
  };
};
