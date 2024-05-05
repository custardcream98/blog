import { getAllPosts } from "src/app/data"
import { type Categoires } from "src/constants/categoryTheme"

export const getPostByCategory = async (category: Categoires) => {
  const posts = await getAllPosts(["title", "slug", "excerpt", "date", "category", "series"])

  return posts.filter((post) => post.category.includes(category))
}
