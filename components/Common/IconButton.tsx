import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";
import styled, { useTheme } from "styled-components";
import { useWindowSize } from "../../lib/hook/useWindowSize";

type Props = {
  icon: IconType;
  title: string;
  size?: string;
} & ComponentPropsWithoutRef<"button">;

const IconButton = forwardRef<HTMLButtonElement, Props>(
  function IconButtonForwardRef(
    { icon, title, size = "1rem", ...props },
    ref
  ) {
    const Icon = icon;
    const { textColor } = useTheme();

    return (
      <Button ref={ref} {...props}>
        <Icon color={textColor} size={size} title={title} />
      </Button>
    );
  }
);

const ResponsiveIconButton = forwardRef<
  HTMLButtonElement,
  Omit<Props, "size"> & {
    mobileSize: string;
    desktopSize: string;
  }
>(function ResponsiveIconButtonForwardRef(
  { icon, title, mobileSize, desktopSize, ...props },
  ref
) {
  const { width } = useWindowSize();
  const isMobile = width <= 800;

  return (
    <StyledResponsiveIconButton
      ref={ref}
      size={isMobile ? mobileSize : desktopSize}
      title={title}
      type="button"
      icon={icon}
      {...props}
    />
  );
});

const Button = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;

  cursor: pointer;
`;

const StyledResponsiveIconButton = styled(IconButton)`
  @media (max-width: 800px) {
    width: 22px;
    height: 22px;
  }
`;

export { ResponsiveIconButton };
export default IconButton;
