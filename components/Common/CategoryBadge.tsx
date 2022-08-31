import React from "react";
import styled from "styled-components";
import Link from "next/link";
import categoryTheme from "../../lib/categoryTheme";

interface IBadge {
  backgroundColor: string;
  borderColor: string;
}

const Badge = styled.li<IBadge>`
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

export const BadgeContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0.7rem -0.3rem;
`;

type Props = {
  category: string;
};

const CategoryBadge = ({ category }: Props) => {
  const { color } = categoryTheme[category];

  return (
    <Link href={`/categories/${category}`}>
      <Badge backgroundColor={`${color}4e`} borderColor={color}>
        {category}
      </Badge>
    </Link>
  );
};

export default CategoryBadge;
