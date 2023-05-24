import styled from "styled-components";
import Link from "next/link";

import { LinkDecorated } from "src/components/Common/styledComponents";
import DateSpan from "src/components/Common/DateSpan";
import CategoryBadges from "src/components/Common/CategoryBadges";
import PostType from "src/types/post";

const Container = styled.li`
  margin-bottom: 1rem;
  border-bottom: 1px solid
    ${(props) => props.theme.subTextColor};
`;

const LinkDecoratedForCate = styled(LinkDecorated)`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.2;
  padding-bottom: 0.2rem;
`;

type Props = PostType;

const CategoryCard = ({
  slug,
  title,
  date,
  category,
}: Props) => (
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
        <CategoryBadges.Badge
          key={category}
          category={category}
        />
      ))}
    </CategoryBadges>
  </Container>
);

export default CategoryCard;
