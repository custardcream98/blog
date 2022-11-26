import { JSDOM } from "jsdom";
import fs from "fs";

import { markdownToHtmlForCache } from "../lib/utils/markdownToHtml";
import { getAllPosts } from "../lib/utils/posts";
import { CachePost } from "./type";

const postsData = getAllPosts([
  "slug",
  "title",
  "content",
  "date",
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
})();
