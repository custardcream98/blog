import { Container, LinkDecorated, Title } from "src/components";

import { sharedMetadata } from "../sharedMetadata";

import { getSeries } from "./data";

import { type Metadata } from "next";
import { utld } from "utility-class-components";

const META_TITLE = "Series";

export const generateMetadata = async (): Promise<Metadata> => {
  const SERIES_COUNT_MAP = await getSeries();
  const SERIES = Object.keys(SERIES_COUNT_MAP);

  return {
    ...sharedMetadata,
    keywords: SERIES,

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

export default async function SeriesPage() {
  const SERIES_COUNT_MAP = await getSeries();
  const SERIES = Object.keys(SERIES_COUNT_MAP);

  return (
    <Container>
      <Title>{"<Series />"}</Title>
      <SeriesList>
        {SERIES.map((series) => (
          <SeriesListItem key={series}>
            <LinkDecorated
              href={`/series/${series}`}
            >{`${series} (${SERIES_COUNT_MAP[series]})`}</LinkDecorated>
          </SeriesListItem>
        ))}
      </SeriesList>
    </Container>
  );
}

const SeriesListItem = utld.li`
  m-[0.125rem]
  p-[0.5625rem]

  rounded-[0.5rem]

  text-default-light
  dark:text-default-dark
`;

const SeriesList = utld.ul`
  w-full
`;
