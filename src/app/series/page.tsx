import { Container, LinkDecorated, Title } from "src/components/Common";

import { sharedMetadata } from "../sharedMetadata";

import { SERIES, SERIES_COUNT_MAP } from "./data";

import { type Metadata } from "next";
import { utld } from "utility-class-components";

const META_TITLE = "Series";

export const metadata: Metadata = {
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

export default function SeriesPage() {
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
