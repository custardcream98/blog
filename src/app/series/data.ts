import { getAllPosts } from "../data";

export const getSeries = async () => {
  const posts = await getAllPosts(["series"]);

  const series: { [key: string]: number } = {};
  posts.forEach((post) => {
    if (post.series) {
      if (!Object.hasOwn(series, post.series)) series[post.series] = 1;
      else series[post.series] += 1;
    }
  });
  return series;
};
