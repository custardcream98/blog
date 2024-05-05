import { CategoryBadges, Container, Title } from "src/components"

import { CATEGORIES } from "./data"

export { metadata } from "./metadata"

export default function CategoriesPage() {
  return (
    <Container>
      <Title>{"<Categories />"}</Title>
      <CategoryBadges>
        {CATEGORIES.map((category) => (
          <CategoryBadges.Badge key={category} category={category} />
        ))}
      </CategoryBadges>
    </Container>
  )
}
