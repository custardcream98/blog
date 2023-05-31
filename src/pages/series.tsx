import { Container, LinkDecorated, Title } from "src/components/Common";
import Meta from "src/components/Layout/Meta";
import { getSeries } from "src/lib/utils/posts";

import { utld } from "utility-class-components";

const SeriesTitle = utld.li`
  m-[0.125rem]
  p-[0.5625rem]

  rounded-[0.5rem]

  text-default-light
  dark:text-default-dark
`;

const SeriesList = utld.ul`
  w-full
`;

type Props = {
  series: { [key: string]: number };
};

function Series({ series }: Props) {
  const seriesList = Object.keys(series);

  // TODO: 시리즈 토글로 만들기
  return (
    <>
      <Meta type='default' title='Series' tags={seriesList} />
      <Container>
        <Title>{"<Series />"}</Title>
        <SeriesList>
          {Object.keys(series).map((key) => (
            <SeriesTitle key={key}>
              <LinkDecorated
                href={{
                  pathname: "/series/[series]",
                  query: { series: key },
                }}
              >{`${key} (${series[key]})`}</LinkDecorated>
            </SeriesTitle>
          ))}
        </SeriesList>
      </Container>
    </>
  );
}

export default Series;

export function getStaticProps() {
  const series = getSeries();

  return {
    props: {
      series,
    },
  };
}
