import React from "react";
import styled from "styled-components";

import {
  Container,
  Title,
} from "src/components/Common/styledComponents";
import CategoryCard from "src/components/Category/CategoryCard";
import Meta from "src/components/Layout/Meta";

import {
  getSeries,
  getPostBySeries,
} from "src/lib/utils/posts";
import PostType from "src/types/post";

const SeriesContainer = styled(Container)`
  display: block;
`;

const SeriesTitle = styled(Title)`
  display: inline-block;
`;

type Props = {
  series: string;
  posts: PostType[];
};

const Series = ({ series, posts }: Props) => {
  return (
    <>
      <Meta
        type="default"
        title={`시리즈 ${series}`}
        tags={[series]}
      />
      <SeriesContainer>
        <SeriesTitle>{`<${series} />`}</SeriesTitle>
        <ol>
          {posts.map((post) => (
            <CategoryCard key={post.slug} {...post} />
          ))}
        </ol>
      </SeriesContainer>
    </>
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
