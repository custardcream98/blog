import { CategoryBadges, DateSpan, LinkDecorated } from "src/components";
import type PostType from "src/types/post";

import { utld } from "utility-class-components";

type PostCardProps = Pick<PostType, "slug" | "title" | "date" | "category">;

export function PostCard({ slug, title, date, category }: PostCardProps) {
  return (
    <Container>
      <LinkDecoratedForCate href={`/posts/${slug}`}>{title}</LinkDecoratedForCate>
      <DateSpan date={date} />
      <CategoryBadges>
        {category.map((category) => (
          <CategoryBadges.Badge key={category} category={category} />
        ))}
      </CategoryBadges>
    </Container>
  );
}

const Container = utld.li`
  mb-4
  border-b
  border-solid
  border-default-sub-light
  dark:border-default-sub-dark
`;

const LinkDecoratedForCate = utld(LinkDecorated)`
  block
  text-[1.2rem]
  font-bold
  leading-[1.2]
  pb-[0.2rem]
`;
