import styled from "styled-components";

import Meta from "components/Layout/Meta";
import CategoryCard from "components/Category/CategoryCard";
import {
  Container,
  Title,
} from "components/Common/styledComponents";

import { getPostByCategory } from "lib/utils/posts";
import categoryTheme from "lib/categoryTheme";
import check404 from "lib/check404";
import type PostType from "types/post";

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
  check404();

  return (
    <>
      <Meta
        type="default"
        title={`카테고리 ${category}`}
        tags={[category]}
      />
      <PostContainer>
        <PostTitle>{`<${category} />`}</PostTitle>
        <ol>
          {posts.map((post) => (
            <CategoryCard key={post.slug} post={post} />
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

export async function getStaticProps({ params }: Params) {
  const posts = getPostByCategory(params.category);

  return {
    props: {
      category: params.category,
      posts: posts,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(categoryTheme).map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  };
}
