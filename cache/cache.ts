import { compileMdForCache } from "src/lib/md";
import type { CachePost } from "src/types/cache";
import type { PostTypeWithoutContent } from "src/types/post";
import { hash } from "src/utils";

import { getAllPosts } from "./data";

import fs from "fs";
import { JSDOM } from "jsdom";

const POST_PER_PAGE = 5;

(async () => {
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
      const cacheHTML = await compileMdForCache(content);
      const { document: cacheDocument } = new JSDOM(cacheHTML).window;
      const elements = cacheDocument.querySelectorAll("h1, h2, h3, h4, h5, h6, p, ol, ul");

      let extractedContent = "";

      elements.forEach((ele) => (extractedContent += ele.textContent?.replaceAll("\n", "") + " "));

      return {
        content: extractedContent,
        date,
        hash: hash(slug),
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

  const postSlugHashedMap = postsCache.reduce<Record<string, string>>((acc, { slug, hash }) => {
    acc[hash] = slug;
    return acc;
  }, {});

  const postSlugHashedMapReversed = postsCache.reduce<Record<string, string>>(
    (acc, { slug, hash }) => {
      acc[slug] = hash;
      return acc;
    },
    {},
  );

  fs.writeFile("./cache/hash.json", JSON.stringify(postSlugHashedMap), (error) => {
    if (error) {
      console.error(error);
    }
    console.log("해시맵 생성 완료");
  });

  fs.writeFile("./cache/hashReversed.json", JSON.stringify(postSlugHashedMapReversed), (error) => {
    if (error) {
      console.error(error);
    }
    console.log("해시맵-reversed 생성 완료");
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
          hash: post.hash,
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
})();
