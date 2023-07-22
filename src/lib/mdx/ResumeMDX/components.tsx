import { FONT_D2_CODING } from "src/fonts";

import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import { utld } from "utility-class-components";

const Ul = utld.ul`
  mt-4

  font-light

  tracking-[0.03rem]
  leading-[1.5]

  print:mt-3

  marker:(
    content-['-']

    text-[1rem]
    font-semibold

    text-resume-accent-light
    dark:text-resume-accent-dark
  )
`;

const Li = utld.li`
  my-[0.4rem]
  ml-[0.4rem]
  pl-[0.6rem]

  print:(
    my-2
    ml-[0.2rem]
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
  wrapper: ({ children }) => (
    <div className={`resume-container ${FONT_D2_CODING.variable}`}>{children}</div>
  ),
};
