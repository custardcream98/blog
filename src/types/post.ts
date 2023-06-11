import type { Categoires } from "src/constants/categoryTheme";

export type CoverImage = {
  lightThumbnail: string;
  darkThumbnail: string;
};

export type PostType = {
  slug: string;
  hash: string;
  title: string;
  date: string;
  category: Categoires[];
  coverImage: CoverImage;
  excerpt: string;
  content: string;
  series?: string;
};

export type PostTypeWithoutContent = Omit<PostType, "content">;

export default PostType;
