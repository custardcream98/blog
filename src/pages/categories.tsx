import { Container, Title } from "src/components/Common";
import CategoryBadges from "src/components/Common/CategoryBadges";
import Meta from "src/components/Layout/Meta";
import categoryTheme from "src/constants/categoryTheme";

const CATEGORIES = Object.keys(categoryTheme);

function CategoriesPage() {
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

export default CategoriesPage;
