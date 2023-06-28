import { safeNumber } from "src/utils";

import NextImage from "next/image";
import { ComponentProps } from "react";

export function MDXImage({
  src,
  alt,
  width,
  height,
  ref,
  ...props
}: Omit<ComponentProps<"img">, "placeholder">) {
  const resolvedRef = typeof ref === "string" ? null : ref;
  const resolvedWidth = typeof width === "undefined" ? undefined : safeNumber(width);
  const resolvedHeight = typeof height === "undefined" ? undefined : safeNumber(height);

  return src ? (
    <NextImage
      ref={resolvedRef}
      alt={alt ?? ""}
      src={src}
      width={resolvedWidth}
      height={resolvedHeight}
      priority
      quality={100}
      {...props}
    />
  ) : null;
}
