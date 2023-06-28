import { MDXImage } from "./MDXImage";

import { type MDXRemoteProps } from "next-mdx-remote/rsc";

export const postComponents: MDXRemoteProps["components"] = {
  NextImage: MDXImage,
  img: MDXImage,
  wrapper: ({ children }) => <div className='post-content'>{children}</div>,
};
