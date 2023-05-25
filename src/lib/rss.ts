import { DEFAULT_IMAGE, DEFAULT_TITLE } from "src/constants/meta";
import { percentEncode } from "src/lib/utils/helper";
import { getAllPosts } from "src/lib/utils/posts";
import { resolveURL } from "src/lib/utils/url";

import { Feed, type FeedOptions } from "feed";
import fs from "fs";

const generateRSSFeed = (coverImages: string[]) => {
  if (!process.env.NEXT_PUBLIC_HOST) {
    throw new Error("NEXT_PUBLIC_HOST is not defined");
  }

  const allPosts = getAllPosts(["title", "slug", "excerpt", "date", "coverImage"]);

  const feedOptions: FeedOptions = {
    copyright: "© " + new Date().getFullYear() + " custardcream98. All rights reserved.",
    favicon: resolveURL("/static/icon.png"),
    feedLinks: {
      atom: resolveURL("/atom.xml"),
      json: resolveURL("/rss.json"),
      rss2: resolveURL("/rss.xml"),
    },
    generator: "custardcream98",
    id: process.env.NEXT_PUBLIC_HOST,
    image: DEFAULT_IMAGE,
    language: "ko",
    link: process.env.NEXT_PUBLIC_HOST,
    title: DEFAULT_TITLE,
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post, index) => {
    const postURL = resolveURL(`/posts/${percentEncode(post.slug)}`);

    feed.addItem({
      date: new Date(post.date),
      description: post.excerpt,
      id: postURL,
      image: coverImages[index],
      link: postURL,
      title: post.title,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
  fs.writeFileSync("./public/rss.json", feed.json1());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
};

export default generateRSSFeed;
