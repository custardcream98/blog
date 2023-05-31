import { LinkDecorated } from "src/components/Common";
import CategoryBadges from "src/components/Common/CategoryBadges";
import DateSpan from "src/components/Common/DateSpan";
import PostType from "src/types/post";

import { utld } from "utility-class-components";

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

type Props = PostType;

function CategoryCard({ slug, title, date, category }: Props) {
  return (
    <Container>
      <LinkDecoratedForCate
        href={{
          pathname: "/posts/[slug]",
          query: { slug: slug },
        }}
      >
        {title}
      </LinkDecoratedForCate>
      <DateSpan date={date} />
      <CategoryBadges>
        {category.map((category) => (
          <CategoryBadges.Badge key={category} category={category} />
        ))}
      </CategoryBadges>
    </Container>
  );
}

export default CategoryCard;
