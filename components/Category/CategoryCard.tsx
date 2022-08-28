import React from "react";
import styled from "styled-components";
import Link from "next/link";
import PostType from "../../interfaces/post";
import { LinkDecorated } from "../../components/Common/styledComponents";
import DateSpan from "../Common/DateSpan";
import CategoryBadge, { BadgeContainer } from "../Common/CategoryBadge";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.subTextColor};
`;

const LinkDecoratedForCate = styled(LinkDecorated)`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2;
  padding-bottom: 0.2rem;
`;

type Props = {
  post: PostType;
};

const CategoryCard = ({ post }: Props) => (
  <Container>
    <Link href={`/posts/${post.slug}`} passHref>
      <LinkDecoratedForCate>{post.title}</LinkDecoratedForCate>
    </Link>
    <DateSpan date={post.date} />
    <BadgeContainer>
      {React.Children.toArray(
        post.category.map((c) => <CategoryBadge category={c} />)
      )}
    </BadgeContainer>
  </Container>
);

export default CategoryCard;
