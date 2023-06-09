import { Container, Title } from "src/components/Common";
import CategoryBadges from "src/components/Common/CategoryBadges";
import categoryTheme, { type Categoires } from "src/constants/categoryTheme";

import { sharedMetadata } from "../sharedMetadata";

import { type Metadata } from "next";

const META_TITLE = "Categories";
const CATEGORIES = Object.keys(categoryTheme) as Categoires[];

export const metadata: Metadata = {
  ...sharedMetadata,
  keywords: CATEGORIES,

  openGraph: {
    ...sharedMetadata.openGraph,
    title: META_TITLE,
  },

  title: META_TITLE,

  twitter: {
    ...sharedMetadata.twitter,
    title: META_TITLE,
  },
};

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
  );
}
