import Link from "next/link";
import { utld } from "utility-class-components";

export const Container = utld.section`
  mx-auto

  w-[90vw]
  max-w-800

  flex
  flex-col
  items-center

  [&>h2:target]:scroll-mt-[5rem]
`;

export const Title = utld.h2`
  my-8
  pb-2
  border-b-3 border-[#3a3e43]
  
  text-[1.4rem]
  font-bold
`;

export const LinkDecorated = utld(Link)`
  break-keep
  no-underline

  transition-colors 
  duration-200

  hover:(text-accent-light dark:text-accent-dark)
`;

export * from "./CategoryBadges";
export * from "./DateSpan";
export * from "./LogoTitleSpan";
