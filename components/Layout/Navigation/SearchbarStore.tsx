import { createContext } from "react";
import { SearchedPost } from "../../../interfaces/searchedPosts";

export const SearchbarStore = createContext<{
  closeResults: () => void;
}>({ closeResults: () => {} });

export const SearchResultStore = createContext<{
  searchResult: SearchedPost;
  isLast: boolean;
}>({
  searchResult: {
    slug: "",
    title: "",
    date: "",
    content: "",
    matchedOne: "title",
    matchLength: 0,
  },
  isLast: false,
});
