import useWindowSize from "src/lib/hook/useWindowSize";

import { type ComponentPropsWithoutRef, createElement, forwardRef } from "react";
import { IconType } from "react-icons";
import { utld } from "utility-class-components";

type ClickableComponents = "a" | "button";

type Props = {
  icon: IconType;
  title: string;
  size?: string;
  buttonAs?: ClickableComponents;
  href?: string;
  target?: string;
} & ComponentPropsWithoutRef<"button">;

const IconButton = forwardRef<HTMLButtonElement, Props>(function IconButtonForwardRef(
  { icon, title, size = "1rem", buttonAs, ...props },
  ref,
) {
  const Icon = icon;

  return createElement(
    buttonAs ?? "button",
    { ref, ...props },
    <Icon className='text-default-light dark:text-default-dark' size={size} title={title} />,
  );
});

const ResponsiveIconButton = forwardRef<
  HTMLButtonElement,
  Omit<Props, "size"> & {
    mobileSize: string;
    desktopSize: string;
  }
>(function ResponsiveIconButtonForwardRef({ icon, title, mobileSize, desktopSize, ...props }, ref) {
  const { width } = useWindowSize();
  const isMobile = width <= 800;

  return (
    <StyledResponsiveIconButton
      ref={ref}
      size={isMobile ? mobileSize : desktopSize}
      title={title}
      type='button'
      icon={icon}
      {...props}
    />
  );
});

const StyledResponsiveIconButton = utld(IconButton)`
  mobile:(
    w-[1.375.rem]
    h-[1.375.rem]
  )
`;

export { ResponsiveIconButton };
export default IconButton;
