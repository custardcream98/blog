import { useIsMobie } from "src/hook";

import { type ComponentPropsWithoutRef, createElement, forwardRef } from "react";
import { IconType } from "react-icons";
import { utld } from "utility-class-components";

type ClickableComponents = "a" | "button";

type IconButtonProps = {
  icon: IconType;
  title: string;
  size?: string | number;
  buttonAs?: ClickableComponents;
  href?: string;
  target?: string;
} & ComponentPropsWithoutRef<"button">;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButtonForwardRef({ icon, title, size = "1rem", buttonAs, ...props }, ref) {
    const Icon = icon;

    return createElement(
      buttonAs ?? "button",
      { "aria-label": title, ref, ...props },
      <Icon className='text-default-light dark:text-default-dark' size={size} title={title} />,
    );
  },
);

export const ResponsiveIconButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "size"> & {
    mobileSize: string;
    desktopSize: string;
  }
>(function ResponsiveIconButtonForwardRef({ icon, title, mobileSize, desktopSize, ...props }, ref) {
  const isMobile = useIsMobie();

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
    w-[1.375rem]
    h-[1.375rem]
  )
`;
