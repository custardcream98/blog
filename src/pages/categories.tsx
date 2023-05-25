import CategoryBadges from "src/components/Common/CategoryBadges";
import { Container, Title } from "src/components/Common/styledComponents";
import Meta from "src/components/Layout/Meta";
import categoryTheme from "src/lib/categoryTheme";

const CATEGORIES = Object.keys(categoryTheme);

function Categories() {
  return (
    <>
      <Meta type='default' title='Categories' tags={CATEGORIES} />
      <Container>
        <Title>{"<Categories />"}</Title>
        <CategoryBadges>
          {CATEGORIES.map((category) => (
            <CategoryBadges.Badge key={category} category={category} />
          ))}
        </CategoryBadges>
      </Container>
    </>
  );
}

export default Categories;
