import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";

const articlesPath = path.join(process.cwd(), "data/posts");

export async function getSlug() {
  const paths = sync(`${articlesPath}/*.mdx`);

  return paths.map((path) => {
    // holds the paths to the directory of the article
    const pathContent = path.split("/");
    const fileName = pathContent[pathContent.length - 1];
    const [slug, _extension] = fileName.split(".");

    return slug;
  });
}

export async function getPostFromSlug(slug) {
  const articleDir = path.join(articlesPath, `${slug}.mdx`);
  const source = fs.readFileSync(articleDir);
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      slug,
      excerpt: data.excerpt,
      title: data.title,
      publishedAt: data.publishedAt,
      readingTime: readingTime(content).text,
      ...data,
    },
  };
}

// interface IPosts = {

// }

export async function getAllPosts() {
  const posts = fs.readdirSync(path.join(process.cwd(), "data/posts"));

  return posts.reduce((allPosts, postSlug) => {
    // get parsed data from mdx files in the "posts" dir
    const source = fs.readFileSync(
      path.join(process.cwd(), "data/posts", postSlug),
      "utf-8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
        readingTime: readingTime(source).text,
      },
      ...allPosts,
    ];
  }, []);
}
