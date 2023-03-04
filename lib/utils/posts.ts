import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import axios from "axios";
import type PostType from "types/post";
import type { PrevNextPosts } from "types/post";

const postsDirectory = join(process.cwd(), "_posts");
const aboutPageDirectory = join(process.cwd(), "about.md");

interface Items extends PostType {
  [key: string]: string | string[] | object | undefined;
}

const getTimeOfPost = (post: Items) =>
  new Date(post.date).getTime();

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((dir) => /\.md$/.test(dir));
}

type PostMeta =
  | "slug"
  | "title"
  | "date"
  | "category"
  | "coverImage"
  | "excerpt"
  | "ogImage"
  | "content"
  | "series";

export function getPostBySlug(
  slug: string,
  fields: PostMeta[] = []
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Items = {
    slug: "",
    title: "",
    date: "",
    category: [],
    coverImage: "",
    excerpt: "",
    ogImage: {
      url: "",
    },
    content: "",
    series: "",
  };

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    } else if (field === "content") {
      items[field] = content;
    } else if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: PostMeta[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort(
      (post1, post2) =>
        getTimeOfPost(post2) - getTimeOfPost(post1)
    );

  return posts;
}

export function getSeries() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, ["series"]))
    .sort(
      (post1, post2) =>
        getTimeOfPost(post2) - getTimeOfPost(post1)
    );
  let series: { [key: string]: number } = {};
  posts.forEach((post) => {
    if (post.series) {
      if (!Object.hasOwn(series, post.series))
        series[post.series] = 1;
      else series[post.series] += 1;
    }
  });
  return series;
}

export function getPrevNextPosts(
  slug: string
): PrevNextPosts {
  const posts = getAllPosts([
    "title",
    "slug",
    "excerpt",
    "date",
  ]);

  const index = posts.findIndex((p) => p.slug === slug);

  const next =
    index !== 0
      ? {
          title: posts[index - 1].title,
          slug: posts[index - 1].slug,
          excerpt: posts[index - 1].excerpt,
        }
      : null;
  const prev =
    posts.length - 1 !== index
      ? {
          title: posts[index + 1].title,
          slug: posts[index + 1].slug,
          excerpt: posts[index + 1].excerpt,
        }
      : null;

  return {
    prevTitle: prev?.title,
    prevSlug: prev?.slug,
    prevExcerpt: prev?.excerpt,
    nextTitle: next?.title,
    nextSlug: next?.slug,
    nextExcerpt: next?.excerpt,
  };
}

export const getAboutContent = () =>
  fs.readFileSync(aboutPageDirectory, "utf8");

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getOgImage(
  title: string
): Promise<string> {
  console.log(`Currently Deploying Thumbnail: ${title}`);

  while (true) {
    try {
      const { created: fileName } = await axios
        .post(
          `http://custardcream.iptime.org:5000/og`,
          {
            title: "개발자 시우의 블로그",
            subtitle: title,
          },
          { timeout: 60000 }
        )
        .then((res) => res.data);
      return fileName;
    } catch (e) {
      console.log("retry getting img of " + title);

      await delay(10000);
    }
  }
}

export async function getAllOgImages(postTitles: string[]) {
  const coverImages = await Promise.all(
    postTitles.map((title) => getOgImage(title))
  ).then((res) =>
    res.map((url) => url.replace("&", "%26"))
  );

  return coverImages;
}

export function getPostByCategory(category: string) {
  const posts = getAllPosts([
    "title",
    "slug",
    "excerpt",
    "date",
    "category",
    "series",
  ]);
  let categoryPosts: Items[] = [];

  posts.forEach((post) => {
    post.category.forEach((c) => {
      if (c === category) categoryPosts.push(post);
    });
  });

  return categoryPosts;
}

export function getPostBySeries(series: string) {
  const posts = getAllPosts([
    "title",
    "slug",
    "excerpt",
    "date",
    "category",
    "series",
  ]);
  let seriesPosts: Items[] = [];

  posts.forEach((post) => {
    if (post.series === series) seriesPosts.push(post);
  });

  return seriesPosts;
}
