import React from "react";

import Meta from "../components/Layout/Meta";
import {
  Container,
  Title,
} from "../components/Common/styledComponents";
import CategoryBadges from "../components/Common/CategoryBadges";

import categoryTheme from "../lib/categoryTheme";
import check404 from "../lib/check404";

const Categories = () => {
  check404();

  return (
    <>
      <Meta title="Categories" />
      <Container>
        <Title>{`<Categories />`}</Title>
        <CategoryBadges>
          {React.Children.toArray(
            Object.keys(categoryTheme).map((category) => (
              <CategoryBadges.Badge category={category} />
            ))
          )}
        </CategoryBadges>
      </Container>
    </>
  );
};

export default Categories;
