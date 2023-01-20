import { ComponentPropsWithoutRef } from "react";
import { Rings } from "react-loader-spinner";
import styled, { css, useTheme } from "styled-components";

type Props = ComponentPropsWithoutRef<"button"> &
  StyledProps & { isLoading?: boolean };
const Button = ({
  children,
  width,
  height,
  isLoading,
  ...props
}: Props) => {
  const { subTextColor } = useTheme();

  return (
    <StyledButton width={width} height={height} {...props}>
      {isLoading ? (
        <Rings
          color={subTextColor}
          width={width}
          height={width}
        />
      ) : (
        children
      )}
    </StyledButton>
  );
};

type StyledProps = {
  width: string;
  height: string;
};
const StyledButton = styled.button<StyledProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 5px;

  overflow: hidden;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  // 로딩 인디케이터 가운데 정렬을 위해 필요

  transition: all 0.2s ease;
  cursor: pointer;

  ${({ theme }) => css`
    font-family: ${theme.mainFont};
    background-color: ${theme.textColor};
    color: ${theme.bgColor};

    :hover,
    :focus {
      color: ${theme.accentColor};
      scale: 1.05;
    }
  `}
`;

export default Button;
