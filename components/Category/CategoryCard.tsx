import styled from "styled-components";
import Link from "next/link";

import { LinkDecorated } from "components/Common/styledComponents";
import DateSpan from "components/Common/DateSpan";
import CategoryBadges from "components/Common/CategoryBadges";
import PostType from "types/post";

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

type Props = {
  post: PostType;
};

const CategoryCard = ({ post }: Props) => (
  <Container>
    <Link href={`/posts/${post.slug}`} passHref>
      <LinkDecoratedForCate>
        {post.title}
      </LinkDecoratedForCate>
    </Link>
    <DateSpan date={post.date} />
    <CategoryBadges>
      {post.category.map((category) => (
        <CategoryBadges.Badge
          key={category}
          category={category}
        />
      ))}
    </CategoryBadges>
  </Container>
);

export default CategoryCard;
