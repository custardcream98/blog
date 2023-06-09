import { type PostType, type PrevNextPosts } from "src/types/post";

import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
const aboutPageDirectory = join(process.cwd(), "about.md");

export const getTimeOfPost = (post: PostType) => new Date(post.date).getTime();

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((dir) => /\.md$/.test(dir));
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

export function getPostBySlug(slug: string, fields: PostMeta[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const postMeta: PostType = {
    category: [],
    content: "",
    coverImage: {
      darkThumbnail: "",
      lightThumbnail: "",
    },
    date: "",
    excerpt: "",
    ogImage: {
      url: "",
    },
    series: "",
    slug: "",
    title: "",
  };

  fields.forEach((field) => {
    if (field === "slug") {
      postMeta[field] = realSlug;
    } else if (field === "content") {
      postMeta[field] = content;
    } else if (typeof data[field] !== "undefined") {
      postMeta[field] = data[field];
    }
  });

  return postMeta;
}

export function getAllPosts(fields: PostMeta[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => getTimeOfPost(post2) - getTimeOfPost(post1));

  return posts;
}

export function getPrevNextPosts(slug: string): PrevNextPosts {
  const posts = getAllPosts(["title", "slug", "excerpt", "date"]);

  const index = posts.findIndex((p) => p.slug === slug);

  const next =
    index !== 0
      ? {
          excerpt: posts[index - 1].excerpt,
          slug: posts[index - 1].slug,
          title: posts[index - 1].title,
        }
      : null;
  const prev =
    posts.length - 1 !== index
      ? {
          excerpt: posts[index + 1].excerpt,
          slug: posts[index + 1].slug,
          title: posts[index + 1].title,
        }
      : null;

  return {
    nextExcerpt: next?.excerpt,
    nextSlug: next?.slug,
    nextTitle: next?.title,
    prevExcerpt: prev?.excerpt,
    prevSlug: prev?.slug,
    prevTitle: prev?.title,
  };
}

export const getAboutContent = () => fs.readFileSync(aboutPageDirectory, "utf8");

export function getPostByCategory(category: string) {
  const posts = getAllPosts(["title", "slug", "excerpt", "date", "category", "series"]);
  const categoryPosts: PostType[] = [];

  posts.forEach((post) => {
    post.category.forEach((c) => {
      if (c === category) categoryPosts.push(post);
    });
  });

  return categoryPosts;
}
