type PostType = {
  slug: string;
  title: string;
  date: string;
  category: string[];
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  series?: string;
  prevTitle?: string;
  prevSlug?: string;
  prevExcerpt?: string;
  nextTitle?: string;
  nextSlug?: string;
  nextExcerpt?: string;
};

export type PostTypeWithoutContent = Omit<
  PostType,
  "content"
>;

export default PostType;

export interface PrevNextPosts {
  prevTitle?: string;
  prevSlug?: string;
  prevExcerpt?: string;
  nextTitle?: string;
  nextSlug?: string;
  nextExcerpt?: string;
}
