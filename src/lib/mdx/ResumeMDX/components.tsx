import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import { utld } from "utility-class-components";

const Ul = utld.ul`
  mt-[1em]

  font-light

  tracking-[0.03em]
  leading-[1.5]

  print:mt-[0.75em]

  marker:(
    content-['-']

    text-[1em]
    font-semibold

    text-resume-accent-light
    dark:text-resume-accent-dark
  )
`;

const Li = utld.li`
  my-[0.4em]
  ml-[0.4em]
  pl-[0.6em]

  print:(
    my-[0.3em]
    ml-[0.2em]
  )
`;

const Strong = utld.strong`
  text-resume-text-strong-light
  dark:text-resume-text-strong-dark
`;

export const resumeComponents: MDXRemoteProps["components"] = {
  li: ({ children }) => <Li>{children}</Li>,
  strong: ({ children }) => <Strong>{children}</Strong>,
  ul: ({ children }) => <Ul>{children}</Ul>,
};
