import { Container, LinkDecorated, Title } from "src/components/Common/styledComponents";
import Meta from "src/components/Layout/Meta";
import { getSeries } from "src/lib/utils/posts";

import styled from "styled-components";

const SeriesTitle = styled.li`
  margin: 2px;
  padding: 9px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor};
`;

const SeriesList = styled.ul`
  width: 100%;
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
