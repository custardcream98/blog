import React from "react";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";
import Home from "../components/Home";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  return <Home allPosts={allPosts} />;
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
