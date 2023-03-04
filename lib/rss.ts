import fs from "fs";
import { Feed } from "feed";

import { resolveURL } from "lib/utils/url";
import { getAllPosts, getOgImage } from "lib/utils/posts";
import { percentEncode } from "lib/utils/helper";
import {
  DEFAULT_IMAGE,
  DEFAULT_TITLE,
} from "constants/meta";

import type { FeedOptions } from "feed";

const generateRSSFeed = async (coverImages: string[]) => {
  if (!process.env.NEXT_PUBLIC_HOST) {
    throw new Error("NEXT_PUBLIC_HOST is not defined");
  }

  const allPosts = getAllPosts([
    "title",
    "slug",
    "excerpt",
    "date",
    "coverImage",
  ]);

  const feedOptions: FeedOptions = {
    id: process.env.NEXT_PUBLIC_HOST,
    title: DEFAULT_TITLE,
    link: process.env.NEXT_PUBLIC_HOST,
    copyright:
      "© " +
      new Date().getFullYear() +
      " custardcream98. All rights reserved.",
    image: DEFAULT_IMAGE,
    favicon: resolveURL(`/static/icon.png`),
    feedLinks: {
      rss2: resolveURL(`/rss.xml`),
      json: resolveURL(`/rss.json`),
      atom: resolveURL(`/atom.xml`),
    },
    generator: "custardcream98",
    language: "ko",
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post, index) => {
    const postURL = resolveURL(
      `/posts/${percentEncode(post.slug)}`
    );

    feed.addItem({
      title: post.title,
      id: postURL,
      link: postURL,
      description: post.excerpt,
      date: new Date(post.date),
      image: coverImages[index],
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
  fs.writeFileSync("./public/rss.json", feed.json1());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
};

export default generateRSSFeed;
