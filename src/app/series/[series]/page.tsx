import { sharedMetadata } from "src/app/sharedMetadata";
import { Container, Title } from "src/components/Common";

import { SERIES } from "../data";

import { CategoryCard } from "./_components";
import { getPostBySeries } from "./data";

import { type Metadata } from "next";
import { utld } from "utility-class-components";

type SeriesParams = {
  params: {
    series: string;
  };
};

export const generateMetadata = ({ params: { series } }: SeriesParams): Metadata => {
  const parsedSeries = decodeURI(series);
  const META_TITLE = `시리즈 ${parsedSeries}`;

  return {
    ...sharedMetadata,
    keywords: parsedSeries,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: META_TITLE,
    },

    title: META_TITLE,

    twitter: {
      ...sharedMetadata.twitter,
      title: META_TITLE,
    },
  };
};

export const generateStaticParams = () => {
  return SERIES.map((series) => ({
    series,
  }));
};

export default function SeriesDynamicPage({ params: { series } }: SeriesParams) {
  const parsedSeries = decodeURI(series);
  const posts = getPostBySeries(parsedSeries);

  return (
    <SeriesContainer>
      <SeriesTitle>{`<${parsedSeries} />`}</SeriesTitle>
      <ol>
        {posts.map((post) => (
          <CategoryCard key={post.slug} {...post} />
        ))}
      </ol>
    </SeriesContainer>
  );
}

const SeriesContainer = utld(Container)`
  !block
`;

const SeriesTitle = utld(Title)`
  inline-block
`;
