import { dateToString } from "src/utils";

import Link from "next/link";
import { utld } from "utility-class-components";

type HeroPostItemProps = {
  date: string;
  excerpt: string;
  slug: string;
  title: string;
};

export function HeroPostItem({ date, excerpt, slug, title }: HeroPostItemProps) {
  const formattedDate = dateToString(new Date(date));

  return (
    <HeroPostItemWrapper key={slug}>
      <HeroPostItemLink href={`/posts/${slug}`}>
        <HeroPostItemTitle>{title}</HeroPostItemTitle>
        <HeroPostItemTime dateTime={date}>{formattedDate}</HeroPostItemTime>
        <HeroPostExcerpt>{excerpt}</HeroPostExcerpt>
      </HeroPostItemLink>
    </HeroPostItemWrapper>
  );
}

const HeroPostItemWrapper = utld.li`
  w-full

  [&+&]:mt-10
`;

const HeroPostItemLink = utld(Link)`
  block
  flex
  flex-col
  py-8

  [&:hover>strong]:text-accent-light
`;

const HeroPostItemTime = utld.time`
  order-1

  mobile:text-[0.9rem]
  text-[1rem]
  font-light
`;

const HeroPostItemTitle = utld.strong`
  order-2

  text-[2rem]
  mt-2
  mb-4
  
  transition-colors

  break-keep
  
  mobile:(
    text-[1.5rem]
    mt-1
    mb-2
  )
`;

const HeroPostExcerpt = utld.p`
  order-3

  font-[300]
`;
