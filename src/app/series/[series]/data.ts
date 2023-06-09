import { getAllPosts } from "src/app/data";

export const getPostBySeries = async (series: string) => {
  const posts = await getAllPosts(["title", "slug", "date", "category", "series"]);

  return posts.filter((post) => post.series === series);
};
