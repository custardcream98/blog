import "server-only";

import { postMDXOptions } from "../options";

import { postComponents } from "./components";

import "./post.css";

import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

export type PostMDXProps = { source: MDXRemoteProps["source"] };
export function PostMDX({ source }: PostMDXProps) {
  /* @ts-expect-error Async Server Component */
  return <MDXRemote source={source} options={postMDXOptions} components={postComponents} />;
}
