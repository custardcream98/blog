import CategoryCard from "src/components/Category/CategoryCard";
import { Container, Title } from "src/components/Common/styledComponents";
import Meta from "src/components/Layout/Meta";
import categoryTheme from "src/lib/categoryTheme";
import { getPostByCategory } from "src/lib/utils/posts";
import type PostType from "src/types/post";

import styled from "styled-components";

const PostContainer = styled(Container)`
  display: block;
`;

const PostTitle = styled(Title)`
  display: inline-block;
`;

type Props = {
  category: string;
  posts: PostType[];
};

export default function Post({ category, posts }: Props) {
  return (
    <>
      <Meta type='default' title={`카테고리 ${category}`} tags={[category]} />
      <PostContainer>
        <PostTitle>{`<${category} />`}</PostTitle>
        <ol>
          {posts.map((post) => (
            <CategoryCard key={post.slug} {...post} />
          ))}
        </ol>
      </PostContainer>
    </>
  );
}

type Params = {
  params: {
    category: string;
  };
};

export function getStaticProps({ params }: Params) {
  const posts = getPostByCategory(params.category);

  return {
    props: {
      category: params.category,
      posts: posts,
    },
  };
}

export function getStaticPaths() {
  return {
    fallback: false,
    paths: Object.keys(categoryTheme).map((category) => ({
      params: {
        category,
      },
    })),
  };
}
