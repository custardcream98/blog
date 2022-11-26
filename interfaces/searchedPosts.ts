export interface SearchedPost {
  slug: string;
  title: string | string[];
  date: string;
  content: string | string[];
  matchLength: number;
  matchedOne: "title" | "content";
}
