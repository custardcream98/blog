import React from "react";
import styled from "styled-components";
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
`;

type Props = {
  category: string;
};

const CategoryBadge = ({ category }: Props) => {
  const { color } = categoryTheme[category];

  return (
    <Badge backgroundColor={`${color}4e`} borderColor={color}>
      {category}
    </Badge>
  );
};

export default CategoryBadge;
