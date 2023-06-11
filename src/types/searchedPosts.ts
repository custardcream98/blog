import { ReactNode } from "react";

interface SearchedPostData {
  hash: string;
  date: string;
}

export interface SearchedPost extends SearchedPostData {
  title: string | string[];
  content: string | string[];
  matchLength: number;
}

export interface SearchedPostCardData extends SearchedPostData {
  title: string;
  titleNode: ReactNode;
  contentNode: ReactNode;
}
