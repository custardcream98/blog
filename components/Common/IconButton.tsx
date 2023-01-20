import { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";
import styled, { useTheme } from "styled-components";

const Button = styled.button`
  margin: 0;
  padding: 0.2rem;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const IconButton = ({
  icon,
  title,
  size = "1rem",
  ...props
}: {
  icon: IconType;
  title: string;
  size?: string;
} & ComponentPropsWithoutRef<"button">) => {
  const Icon = icon;
  const { textColor } = useTheme();

  return (
    <Button type="button" {...props}>
      <Icon color={textColor} size={size} title={title} />
    </Button>
  );
};

export default IconButton;
