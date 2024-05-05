import { PostCard } from "src/app/_components"
import { Container, Title } from "src/components"
import { type Categoires } from "src/constants/categoryTheme"

import { CATEGORIES } from "../data"

import { getPostByCategory } from "./data"
import type { CategoryPageParams } from "./types"

import { utld } from "utility-class-components"

export { generateMetadata } from "./metadata"

export const generateStaticParams = () => {
  return CATEGORIES.map((category) => ({
    category,
  }))
}

export default async function CategoryDynamicPage({ params: { category } }: CategoryPageParams) {
  const decodedCategory = decodeURIComponent(category) as Categoires
  const posts = await getPostByCategory(decodedCategory)

  return (
    <PostsContainer>
      <PostTitle>{`<${decodedCategory} />`}</PostTitle>
      <ol>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </ol>
    </PostsContainer>
  )
}

const PostsContainer = utld(Container)`
  !block
`

const PostTitle = utld(Title)`
  inline-block
`
