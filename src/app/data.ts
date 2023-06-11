import "server-only";

import { getOgImage } from "src/lib/utils/ogImage";
import type { PostType } from "src/types/post";

import HASH_MAP from "cache/hash.json";
import HASH_REVERSERSED_MAP from "cache/hashReversed.json";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type PostMeta = keyof PostType;

const DIRECTORY_POSTS = path.join(process.cwd(), "_posts");

export const getPostSlugs = () => {
  return fs
    .readdirSync(DIRECTORY_POSTS)
    .filter((dir) => /\.md$/.test(dir))
    .map((dir) => dir.replace(/\.md$/, ""));
};

const getPostFileData = (slug: string) => {
  const fullPath = path.join(DIRECTORY_POSTS, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  return matter(file);
};

type PostByFields<Fields extends PostMeta> = Pick<PostType, "date" | "hash" | Fields>;

export const getAllPosts = async <Field extends PostMeta[]>(fields: Field) => {
  const slugs = getPostSlugs();
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)))).sort(
    (post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime(),
  );

  return posts;
};

const hasField = <T extends object, FieldType>(
  targetObject: T,
  targetField: PostMeta,
  fields: PostMeta[],
): targetObject is T & Record<typeof targetField, FieldType> => fields.includes(targetField);

const getPostBySlug = async <Field extends PostMeta[]>(
  slug: string,
  fields: Field,
): Promise<PostByFields<Field[number]>> => {
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
    } else if (typeof data[field] !== "undefined") {
      return {
        ...postMeta,
        [field]: data[field],
      };
    }
    return postMeta;
  }, {} as PostByFields<Field[number]>);

  if (hasField(postMeta, "coverImage", fields)) {
    postMeta.coverImage = await getOgImage(data.title);
  }

  postMeta.date = data.date;
  postMeta.hash = getHashedSlug(slug);

  return postMeta;
};

export const getPostByHashedSlug = async <Field extends PostMeta[]>(
  hash: string,
  fields: Field,
): Promise<PostByFields<Field[number]>> => {
  const slug = getSlugFromHased(hash);
  return await getPostBySlug(slug, fields);
};

export const getHashedSlug = (slug: string) => {
  return (HASH_REVERSERSED_MAP as Record<string, string>)[slug];
};

const getSlugFromHased = (hash: string) => {
  return (HASH_MAP as Record<string, string>)[hash];
};
