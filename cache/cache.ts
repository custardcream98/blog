import { JSDOM } from "jsdom";
import fs from "fs";

import { markdownToHtmlForCache } from "../lib/utils/markdownToHtml";
import { getAllPosts } from "../lib/utils/posts";
import { CachePost } from "./type";

const postsData = getAllPosts(["slug", "title", "content"]);

(async () => {
  const postsCache: CachePost[] = await Promise.all(
    postsData.map(async (data) => {
      const cacheHTML = await markdownToHtmlForCache(
        data.content
      );
      const { document: cacheDocument } = new JSDOM(
        cacheHTML
      ).window;
      const elements = cacheDocument.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, ol, ul"
      );

      let content = "";

      elements.forEach(
        (ele) =>
          (content +=
            ele.textContent?.replaceAll("\n", "") + " ")
      );

      return {
        slug: data.slug,
        title: data.title,
        content: content,
      };
    })
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
