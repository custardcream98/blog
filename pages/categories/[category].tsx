import React from "react";
import styled from "styled-components";
import { getPostByCategory } from "../../lib/api";
import categoryTheme from "../../lib/categoryTheme";
import { Container, Title } from "../../components/Common/styledComponents";
import type PostType from "../../interfaces/post";
import Layout from "../../components/Layout/Layout";
import check404 from "../../lib/check404";
import CategoryCard from "../../components/Category/CategoryCard";

type Props = {
  category: string;
  posts: PostType[];
};

export default function Post({ category, posts }: Props) {
  check404();
  return (
    <Layout title={`카테고리 ${category}`} url={`categories/${category}`}>
      <Container style={{ alignItems: "flex-start" }}>
        <Title>{`<${category} />`}</Title>
        {React.Children.toArray(
          posts.map((post) => <CategoryCard post={post} />)
        )}
      </Container>
    </Layout>
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
