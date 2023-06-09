import { getPostBySlug, getPostSlugs, getTimeOfPost } from "src/lib/utils/posts";

const getSeries = () => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, ["series"]))
    .sort((post1, post2) => getTimeOfPost(post2) - getTimeOfPost(post1));
  const series: { [key: string]: number } = {};
  posts.forEach((post) => {
    if (post.series) {
      if (!Object.hasOwn(series, post.series)) series[post.series] = 1;
      else series[post.series] += 1;
    }
  });
  return series;
};

export const SERIES_COUNT_MAP = getSeries();
export const SERIES = Object.keys(SERIES_COUNT_MAP);
