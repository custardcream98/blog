import React from "react";

import Meta from "../components/Layout/Meta";
import { Container, Title } from "../components/Common/styledComponents";
import Badge, { BadgeContainer } from "../components/Common/CategoryBadge";

import categoryTheme from "../lib/categoryTheme";
import check404 from "../lib/check404";

const Categories = () => {
  check404();

  return (
    <>
      <Meta title="Categories" />
      <Container>
        <Title>{`<Categories />`}</Title>
        <BadgeContainer>
          {React.Children.toArray(Object.keys(categoryTheme).map((c) => <Badge category={c} />))}
        </BadgeContainer>
      </Container>
    </>
  );
};

export default Categories;
