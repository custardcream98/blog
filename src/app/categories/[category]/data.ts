import { getAllPosts } from "src/lib/utils/posts";

export function getPostByCategory(category: string) {
  const posts = getAllPosts(["title", "slug", "excerpt", "date", "category", "series"]);

  return posts.filter((post) => (post.category as string[]).includes(category));
}
