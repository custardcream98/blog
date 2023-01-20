import { JSDOM } from "jsdom";
import fs from "fs";

import { markdownToHtmlForCache } from "../lib/utils/markdownToHtml";
import { getAllPosts } from "../lib/utils/posts";
import { CachePost } from "./type";
import { PostTypeWithoutContent } from "../@types/post";

const POST_PER_PAGE = 5;

const postsData = getAllPosts([
  "slug",
  "title",
  "content",
  "excerpt",
  "date",
  "coverImage",
  "category",
  "ogImage",
]);

(async () => {
  const postsCache: CachePost[] = await Promise.all(
    postsData.map(
      async ({ slug, title, content, date }) => {
        const cacheHTML = await markdownToHtmlForCache(
          content
        );
        const { document: cacheDocument } = new JSDOM(
          cacheHTML
        ).window;
        const elements = cacheDocument.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, ol, ul"
        );

        let extractedContent = "";

        elements.forEach(
          (ele) =>
            (extractedContent +=
              ele.textContent?.replaceAll("\n", "") + " ")
        );

        return {
          slug,
          title,
          date,
          content: extractedContent,
        };
      }
    )
  );

  postsCache.sort(
    (post1, post2) =>
      post1.content.length - post2.content.length
  );

  fs.writeFile(
    `./cache/cache.json`,
    JSON.stringify(postsCache),
    (error) => {
      if (error) {
        console.error(error);
      }
      console.log("캐시 생성 완료");
    }
  );

  const postByPageArr = postsData
    .sort(
      (post1, post2) =>
        Date.parse(post2.date) - Date.parse(post1.date)
    )
    .reduce<[PostTypeWithoutContent[]]>(
      (acc, post, i) => {
        if (i % POST_PER_PAGE === 0 && i !== 0)
          acc.push([]);
        acc[Math.floor(i / POST_PER_PAGE)].push({
          slug: post.slug,
          title: post.title,
          date: post.date,
          category: post.category,
          coverImage: post.coverImage,
          excerpt: post.excerpt,
          ogImage: post.ogImage,
        });
        return acc;
      },
      [[]]
    );

  fs.writeFile(
    `./cache/postByPageArr.json`,
    JSON.stringify(postByPageArr),
    (error) => {
      if (error) {
        console.error(error);
      }
      console.log("postByPageArr 캐시 생성 완료");
    }
  );
})();
