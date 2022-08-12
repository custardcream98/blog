import React from "react";
import styled from "styled-components";
import Link from "next/link";
import categoryTheme from "../../lib/categoryTheme";

interface IBadge {
  backgroundColor: string;
  borderColor: string;
}

const Badge = styled.div<IBadge>`
  display: block;
  margin-right: 0.3rem;
  padding: 0.3rem;
  font-weight: 500;
  font-size: 0.6rem;
  border-radius: 100px;
  border: 0.1rem solid ${(props) => props.borderColor};
  color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  flex-wrap: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
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
