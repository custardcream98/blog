import { type MDXRemoteProps } from "next-mdx-remote/rsc";

export const postComponents: MDXRemoteProps["components"] = {
  wrapper: ({ children }) => <div className='post-content'>{children}</div>,
};
