import "server-only";

import { resumeMDXOptions } from "../options";

import { resumeComponents } from "./components";

import "./resume.css";

import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc";

export const compileResumeMDX = async (source: MDXRemoteProps["source"]) => {
  const { content } = await compileMDX({
    components: resumeComponents,
    options: resumeMDXOptions,
    source,
  });

  return content;
};
