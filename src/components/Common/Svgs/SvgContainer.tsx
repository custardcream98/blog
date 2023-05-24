import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type StyledSvgContainerProps = {
  svgWidth?: string;
  svgHeight?: string;
  svgColor?: string;
  svgHoverColor?: string;
};
type SvgContainerProps = PropsWithChildren &
  StyledSvgContainerProps;

const SvgContainer = ({
  children,
  ...restProps
}: SvgContainerProps) => {
  return <Container {...restProps}>{children}</Container>;
};

const Container = styled.span<StyledSvgContainerProps>`
  display: inline-block;

  > svg {
    fill: currentColor;
    width: inherit;
    height: inherit;
  }

  ${({ svgWidth, svgHeight, svgColor, svgHoverColor }) =>
    css`
      ${
        svgWidth &&
        css`
          width: ${svgWidth};
        `
      }

      ${
        svgHeight &&
        css`
          height: ${svgHeight};
        `
      }

      ${
        svgColor &&
        css`
          color: ${svgColor};
        `
      }

      :hover {
        ${
          svgHoverColor &&
          css`
            color: ${svgHoverColor};
          `
        }
    `}
`;

export default SvgContainer;
