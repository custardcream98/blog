import { PostCard } from "src/app/_components";
import { sharedMetadata } from "src/app/sharedMetadata";
import { Container, Title } from "src/components/Common";

import { CATEGORIES } from "../data";

import { getPostByCategory } from "./data";

import { type Metadata } from "next";
import { utld } from "utility-class-components";

type CategoryParams = {
  params: {
    category: string;
  };
};

export const generateMetadata = ({ params: { category } }: CategoryParams): Metadata => {
  const parsedCategory = decodeURI(category);
  const META_TITLE = `카테고리 - ${parsedCategory}`;

  return {
    ...sharedMetadata,
    keywords: parsedCategory,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: META_TITLE,
    },

    title: META_TITLE,

    twitter: {
      ...sharedMetadata.twitter,
      title: META_TITLE,
    },
  };
};

export const generateStaticParams = () => {
  return CATEGORIES.map((category) => ({
    category,
  }));
};

export default function CategoryDynamicPage({ params: { category } }: CategoryParams) {
  const posts = getPostByCategory(category);

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
