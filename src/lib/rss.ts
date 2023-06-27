import { getAllPosts } from "src/app/data";
import { METADATA_DEFAULT_IMAGE, METADATA_DEFAULT_TITLE } from "src/app/sharedMetadata";

import { Feed, type FeedOptions } from "feed";
import fs from "fs";

const getFullUrl = (url: string) => {
  return process.env.NEXT_PUBLIC_HOST + url;
};

const generateRSSFeed = async (coverImages: string[]) => {
  if (!process.env.NEXT_PUBLIC_HOST) {
    throw new Error("NEXT_PUBLIC_HOST is not defined");
  }

  const allPosts = await getAllPosts(["title", "slug", "excerpt", "date", "coverImage"]);

  const feedOptions: FeedOptions = {
    copyright: "© " + new Date().getFullYear() + " custardcream98. All rights reserved.",
    favicon: getFullUrl("/static/icon.png"),
    feedLinks: {
      atom: getFullUrl("/atom.xml"),
      json: getFullUrl("/rss.json"),
      rss2: getFullUrl("/rss.xml"),
    },
    generator: "custardcream98",
    id: process.env.NEXT_PUBLIC_HOST,
    image: METADATA_DEFAULT_IMAGE.url,
    language: "ko",
    link: process.env.NEXT_PUBLIC_HOST,
    title: METADATA_DEFAULT_TITLE,
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post, index) => {
    const postURL = getFullUrl(`/posts/${post.slug}`);

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
