import React from "react";
import { getSeries, getPostBySeries } from "../../lib/api";
import { Container, Title } from "../../components/Common/styledComponents";
import type PostType from "../../interfaces/post";
import Layout from "../../components/Layout/Layout";
import CategoryCard from "../../components/Category/CategoryCard";

type Props = {
  series: string;
  posts: PostType[];
};

const Series = ({ series, posts }: Props) => {
  return (
    <Layout title={`시리즈 ${series}`}>
      <Container style={{ display: "block" }}>
        <Title style={{ display: "inline-block" }}>{`<${series} />`}</Title>
        <ol>
          {React.Children.toArray(
            posts.map((post) => <CategoryCard post={post} />)
          )}
        </ol>
      </Container>
    </Layout>
  );
};

export default Series;

type Params = {
  params: {
    series: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const posts = getPostBySeries(params.series);

  return {
    props: {
      series: params.series,
      posts: posts,
    },
  };
}

export async function getStaticPaths() {
  const series = getSeries();

  return {
    paths: Object.keys(series).map((key) => {
      return {
        params: {
          series: key,
        },
      };
    }),
    fallback: false,
  };
}
