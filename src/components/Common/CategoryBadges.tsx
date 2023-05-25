import categoryTheme from "src/lib/categoryTheme";

import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";

interface IBadge {
  backgroundColor: string;
  borderColor: string;
}

const StyledAnchor = styled(Link)<IBadge>`
  display: block;

  margin: 0.3rem;
  padding: 0.3rem;
  font-weight: 500;
  font-size: 0.85rem;
  border-radius: 100px;
  letter-spacing: 0.02rem;
  border: 0.1rem solid ${(props) => props.borderColor};
  color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  flex-wrap: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

const CategoryBadgesWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0.7rem -0.3rem;
`;

type Props = {
  category: string;
};

function CategoryBadges({ children }: { children: ReactNode }) {
  return <CategoryBadgesWrapper>{children}</CategoryBadgesWrapper>;
}

function Badge({ category }: Props) {
  const { color } = categoryTheme[category];

  return (
    <li>
      <StyledAnchor
        href={{
          pathname: "/categories/[category]",
          query: { category: category },
        }}
        backgroundColor={`${color}4e`}
        borderColor={color}
      >
        {category}
      </StyledAnchor>
    </li>
  );
}

CategoryBadges.Badge = Badge;

export default CategoryBadges;
