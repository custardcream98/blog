import type { ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";
import categoryTheme from "../../lib/categoryTheme";

interface IBadge {
  backgroundColor: string;
  borderColor: string;
}

const StyledAnchor = styled.a<IBadge>`
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

const CategoryBadges = ({
  children,
}: {
  children: ReactNode;
}) => (
  <CategoryBadgesWrapper>{children}</CategoryBadgesWrapper>
);

const Badge = ({ category }: Props) => {
  const { color } = categoryTheme[category];

  return (
    <li>
      <Link href={`/categories/${category}`} passHref>
        <StyledAnchor
          backgroundColor={`${color}4e`}
          borderColor={color}
        >
          {category}
        </StyledAnchor>
      </Link>
    </li>
  );
};

CategoryBadges.Badge = Badge;

export default CategoryBadges;
