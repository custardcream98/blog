import { getAllPosts } from "src/lib/utils/posts";

export const getPostBySeries = (series: string) => {
  const posts = getAllPosts(["title", "slug", "excerpt", "date", "category", "series"]);

  return posts.filter((post) => post.series === series);
};
