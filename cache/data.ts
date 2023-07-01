import { PostMeta } from "src/app/data";
import type PostType from "src/types/post";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

const DIRECTORY_POSTS = path.join(process.cwd(), "_posts");

const getPostFileData = (slug: string) => {
  const fullPath = path.join(DIRECTORY_POSTS, `${slug}.mdx`);
  const file = fs.readFileSync(fullPath, "utf8");
  return matter(file);
};

export const getPostSlugs = () => {
  return fs
    .readdirSync(DIRECTORY_POSTS)
    .filter((dir) => /\.mdx$/.test(dir))
    .map((dir) => dir.replace(/\.mdx$/, ""));
};

export const getAllPosts = <Field extends PostMeta[]>(fields: Field) => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime());

  return posts;
};

type PostByFields<Fields extends PostMeta> = Pick<PostType, "date" | Fields>;

export const getPostBySlug = <Field extends PostMeta[]>(
  slug: string,
  fields: Field,
): PostByFields<Field[number]> => {
  const { data, content } = getPostFileData(slug);

  const postMeta = fields.reduce((postMeta, field) => {
    if (field === "slug") {
      return {
        ...postMeta,
        slug,
      };
    } else if (field === "content") {
      return {
        ...postMeta,
        content,
      };
    } else if (data[field] !== undefined) {
      return {
        ...postMeta,
        [field]: data[field],
      };
    }
    return postMeta;
  }, {} as PostByFields<Field[number]>);

  postMeta.date = data.date;

  return postMeta;
};
