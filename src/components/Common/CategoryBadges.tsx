import categoryTheme, { type Categoires } from "src/constants/categoryTheme";

import Link from "next/link";
import type { ReactNode } from "react";
import { utld } from "utility-class-components";

const StyledLink = utld(Link)`
  block

  m-[0.3rem]
  px-[0.4rem]
  py-[0.2rem]
  
  font-medium
  text-[0.85rem]
  rounded-full

  border-[0.1rem]
  border-solid

  flex-nowrap
`;

const CategoryBadgesWrapper = utld.ul`
  flex
  flex-wrap

  mx-[-0.3rem]
  my-[0.7rem]
`;

type Props = {
  category: Categoires;
};

function CategoryBadges({ children }: { children: ReactNode }) {
  return <CategoryBadgesWrapper>{children}</CategoryBadgesWrapper>;
}

function Badge({ category }: Props) {
  const style = categoryTheme[category];

  return (
    <li>
      <StyledLink
        href={{
          pathname: `/categories/${category}`,
        }}
        className={style}
      >
        {category}
      </StyledLink>
    </li>
  );
}

CategoryBadges.Badge = Badge;

export default CategoryBadges;
