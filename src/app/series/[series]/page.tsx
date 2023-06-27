import { PostCard } from "src/app/_components";
import { Container, Title } from "src/components";

import { getSeries } from "../data";

import { getPostBySeries } from "./data";
import type { SeriesPageParams } from "./types";

import { utld } from "utility-class-components";

export { generateMetadata } from "./metadata";

export const generateStaticParams = async () => {
  const SERIES_COUNT_MAP = await getSeries();
  const SERIES = Object.keys(SERIES_COUNT_MAP);

  return SERIES.map((series) => ({
    series,
  }));
};

export default async function SeriesDynamicPage({ params: { series } }: SeriesPageParams) {
  const parsedSeries = decodeURIComponent(series);
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
