import type { PropsWithClassName } from "src/types/props";

import { utld } from "utility-class-components";

export function LogoTitleSpan({ className }: PropsWithClassName) {
  return <Span className={className}>shiwoo.dev</Span>;
}

const Span = utld.span`
  text-[1rem]
  font-extrabold
  tracking-[-0.03rem]

  text-default-light
  dark:text-default-dark

  mobile:text-[0.9rem]
`;
