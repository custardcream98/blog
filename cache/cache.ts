import { compileMDXForCache } from "src/lib/mdx/compileMDX";
import type { CachePost } from "src/types/cache";
import type { PostTypeWithoutContent } from "src/types/post";

import { getAllPosts } from "./data";

import fs from "fs";
import { JSDOM } from "jsdom";
import { renderToStaticMarkup } from "react-dom/server";

const POST_PER_PAGE = 5;

const generateCache = async () => {
  const postsData = getAllPosts([
    "slug",
    "title",
    "content",
    "excerpt",
    "date",
    "coverImage",
    "category",
  ]);

  const postsCache: CachePost[] = await Promise.all(
    postsData.map(async ({ slug, title, content, date }) => {
      const { content: mdxContent } = await compileMDXForCache(content);
      const { document: cacheDocument } = new JSDOM(renderToStaticMarkup(mdxContent as any)).window; // NOTE: @types/react-dom type issue로 인해 any로 cast함. 추후 수정 필요
      const elements = cacheDocument.querySelectorAll("h1, h2, h3, h4, h5, h6, p, ol, ul");

      let extractedContent = "";

      elements.forEach((ele) => (extractedContent += ele.textContent?.replaceAll("\n", "") + " "));

      return {
        content: extractedContent,
        date,
        slug,
        title,
      };
    }),
  );

  postsCache.sort((post1, post2) => post1.content.length - post2.content.length);

  fs.writeFile("./cache/cache.json", JSON.stringify(postsCache), (error) => {
    if (error) {
      console.error(error);
    }
    console.log("캐시 생성 완료");
  });

  const postByPageArr = postsData
    .sort((post1, post2) => Date.parse(post2.date) - Date.parse(post1.date))
    .reduce<[PostTypeWithoutContent[]]>(
      (acc, post, i) => {
        if (i % POST_PER_PAGE === 0 && i !== 0) acc.push([]);
        acc[Math.floor(i / POST_PER_PAGE)].push({
          category: post.category,
          coverImage: post.coverImage,
          date: post.date,
          excerpt: post.excerpt,
          slug: post.slug,
          title: post.title,
        });
        return acc;
      },
      [[]],
    );

  fs.writeFile("./cache/postByPageArr.json", JSON.stringify(postByPageArr), (error) => {
    if (error) {
      console.error(error);
    }
    console.log("postByPageArr 캐시 생성 완료");
  });
};

generateCache();
