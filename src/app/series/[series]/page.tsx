import { PostCard } from "src/app/_components";
import { sharedMetadata } from "src/app/sharedMetadata";
import { Container, Title } from "src/components";

import { getSeries } from "../data";

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
  const META_TITLE = `시리즈 - ${parsedSeries}`;

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

export const generateStaticParams = async () => {
  const SERIES_COUNT_MAP = await getSeries();
  const SERIES = Object.keys(SERIES_COUNT_MAP);

  return SERIES.map((series) => ({
    series,
  }));
};

export default async function SeriesDynamicPage({ params: { series } }: SeriesParams) {
  const parsedSeries = decodeURI(series);
  const posts = await getPostBySeries(parsedSeries);

  return (
    <SeriesContainer>
      <SeriesTitle>{`<${parsedSeries} />`}</SeriesTitle>
      <ol>
        {posts.map(({ category, date, slug, title }) => (
          <PostCard key={slug} category={category} date={date} slug={slug} title={title} />
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
