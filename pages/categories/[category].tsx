import React from "react";

import Meta from "../../components/Layout/Meta";
import CategoryCard from "../../components/Category/CategoryCard";
import { Container, Title } from "../../components/Common/styledComponents";

import { getPostByCategory } from "../../lib/api";
import categoryTheme from "../../lib/categoryTheme";
import check404 from "../../lib/check404";

import type PostType from "../../interfaces/post";

type Props = {
  category: string;
  posts: PostType[];
};

export default function Post({ category, posts }: Props) {
  check404();

  return (
    <>
      <Meta title={`카테고리 ${category}`} tags={[category]} />
      <Container style={{ display: "block" }}>
        <Title style={{ display: "inline-block" }}>{`<${category} />`}</Title>
        <ol>{React.Children.toArray(posts.map((post) => <CategoryCard post={post} />))}</ol>
      </Container>
    </>
  );
}

type Params = {
  params: {
    category: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const posts = getPostByCategory(params.category);

  return {
    props: {
      category: params.category,
      posts: posts,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(categoryTheme).map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  };
}
