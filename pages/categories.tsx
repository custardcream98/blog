import { Children } from "react";

import Meta from "components/Layout/Meta";
import {
  Container,
  Title,
} from "components/Common/styledComponents";
import CategoryBadges from "components/Common/CategoryBadges";

import categoryTheme from "lib/categoryTheme";
import check404 from "lib/check404";

const CATEGORIES = Object.keys(categoryTheme);

const Categories = () => {
  check404();

  return (
    <>
      <Meta
        type="default"
        title="Categories"
        tags={CATEGORIES}
      />
      <Container>
        <Title>{`<Categories />`}</Title>
        <CategoryBadges>
          {CATEGORIES.map((category) => (
            <CategoryBadges.Badge
              key={category}
              category={category}
            />
          ))}
        </CategoryBadges>
      </Container>
    </>
  );
};

export default Categories;
