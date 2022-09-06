import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { getSeries } from "../lib/api";
import Layout from "../components/Layout/Layout";
import {
  Container,
  LinkDecorated,
  Title,
} from "../components/Common/styledComponents";

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
  return (
    <Layout title="Series">
      <Container>
        <Title>{`<Series />`}</Title>
        <ul style={{ width: "100%" }}>
          {React.Children.toArray(
            Object.keys(series).map((key) => (
              <SeriesTitle>
                <LinkDecorated>
                  <Link
                    href={`/series/${key}`}
                  >{`${key} (${series[key]})`}</Link>
                </LinkDecorated>
              </SeriesTitle>
            ))
          )}
        </ul>
      </Container>
    </Layout>
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
