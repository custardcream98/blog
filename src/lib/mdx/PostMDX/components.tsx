import { safeNumber } from "src/utils";

import NextImage from "next/image";
import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import { ComponentProps } from "react";

function MDXImage({
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
      placeholder={"empty"}
      {...props}
    />
  ) : null;
}

export const postComponents: MDXRemoteProps["components"] = {
  NextImage: MDXImage,
  img: MDXImage,
  wrapper: ({ children }) => <div className='post-content'>{children}</div>,
};
