import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Meta from "../components/Layout/Meta";
import { Container, LinkDecorated, Title } from "../components/Common/styledComponents";

import { getSeries } from "../lib/api";
import check404 from "../lib/check404";

const SeriesTitle = styled.li`
  margin: 2px;
  padding: 9px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor};
`;

type Props = {
  series: { [key: string]: number };
};

const Series = ({ series }: Props) => {
  check404();

  return (
    <>
      <Meta title="Series" />
      <Container>
        <Title>{`<Series />`}</Title>
        <ul style={{ width: "100%" }}>
          {React.Children.toArray(
            Object.keys(series).map((key) => (
              <SeriesTitle>
                <Link href={`/series/${key}`}>
                  <LinkDecorated>{`${key} (${series[key]})`}</LinkDecorated>
                </Link>
              </SeriesTitle>
            ))
          )}
        </ul>
      </Container>
    </>
  );
};

export default Series;

export async function getStaticProps() {
  const series = getSeries();

  return {
    props: {
      series,
    },
  };
}
