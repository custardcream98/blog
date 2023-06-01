import CategoryCard from "src/components/Category/CategoryCard";
import { Container, Title } from "src/components/Common";
import Meta from "src/components/Layout/Meta";
import { getPostBySeries, getSeries } from "src/lib/utils/posts";
import PostType from "src/types/post";

import { utld } from "utility-class-components";

const SeriesContainer = utld(Container)`
  !block
`;

const SeriesTitle = utld(Title)`
  inline-block
`;

type Props = {
  series: string;
  posts: PostType[];
};

function Series({ series, posts }: Props) {
  return (
    <>
      <Meta type='default' title={`시리즈 ${series}`} tags={[series]} />
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
}

export default Series;

type Params = {
  params: {
    series: string;
  };
};

export function getStaticProps({ params }: Params) {
  const posts = getPostBySeries(params.series);

  return {
    props: {
      posts: posts,
      series: params.series,
    },
  };
}

export function getStaticPaths() {
  const series = getSeries();

  return {
    fallback: false,
    paths: Object.keys(series).map((key) => {
      return {
        params: {
          series: key,
        },
      };
    }),
  };
}
