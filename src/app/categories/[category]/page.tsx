import { PostCard } from "src/app/_components";
import { Container, Title } from "src/components";

import { CATEGORIES } from "../data";

import { getPostByCategory } from "./data";
import type { CategoryPageParams } from "./types";

import { utld } from "utility-class-components";

export { generateMetadata } from "./metadata";

export const generateStaticParams = () => {
  return CATEGORIES.map((category) => ({
    category,
  }));
};

export default async function CategoryDynamicPage({ params: { category } }: CategoryPageParams) {
  const posts = await getPostByCategory(category);

  return (
    <PostsContainer>
      <PostTitle>{`<${category} />`}</PostTitle>
      <ol>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </ol>
    </PostsContainer>
  );
}

const PostsContainer = utld(Container)`
  !block
`;

const PostTitle = utld(Title)`
  inline-block
`;
