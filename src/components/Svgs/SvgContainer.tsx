import { PropsWithChildren } from "react";
import { utld } from "utility-class-components";

type StyledSvgContainerProps = {
  svgWidth?: string;
  svgHeight?: string;
  svgColor?: string;
};
type SvgContainerProps = PropsWithChildren<StyledSvgContainerProps>;

function SvgContainer({ children, svgColor, svgHeight, svgWidth }: SvgContainerProps) {
  return (
    <Container
      style={{
        color: svgColor,
        height: svgHeight,
        width: svgWidth,
      }}
    >
      {children}
    </Container>
  );
}

const Container = utld.span`
  inline-block

  [&>svg]:(
    align-top
    fill-current
    w-[inherit]
    h-[inherit]
  )
`;

export default SvgContainer;
