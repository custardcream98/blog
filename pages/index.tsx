import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Paging from "../components/Common/Paging";
import { Container, Title } from "../components/Common/styledComponents";
import HeroPost from "../components/Home/HeroPost";
import Intro from "../components/Home/Intro";
import Layout from "../components/Layout/Layout";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const router = useRouter();
  const { page } = router.query;

  const [currentPage, setCurrentPage] = useState(0);
  const [postByPage, setPostByPage] = useState<[Post[]]>([[]]);

  // const onPageChange = (to: number) => setCurrentPage((prev) => to);
  const onPageChange = (to: number) =>
    router.push({
      pathname: "/",
      query: {
        page: to,
      },
    });

  useEffect(() => {
    let counter = 0;
    let postByPageArr: [Post[]] = [[]];
    allPosts.forEach((post, index) => {
      if (index % 5 === 0 && index !== 0) {
        counter++;
        postByPageArr.push([]);
      }

      postByPageArr[counter].push(post);
    });

    setPostByPage((_) => [...postByPageArr]);
  }, []);

  useEffect(() => {
    setCurrentPage((_) => parseInt(page as string) - 1 || 0);
  }, [page]);

  return (
    <Layout>
      <Intro />
      <Container>
        <Title as="h2" id="Posts_Title">
          {"<Posts />"}
        </Title>
        <ol>
          {React.Children.toArray(
            postByPage[currentPage].map((post, i) => (
              <HeroPost
                index={i}
                maxPostCount={postByPage[currentPage].length}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))
          )}
        </ol>
        <Paging
          pageScale={Math.ceil(allPosts.length / 5)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Container>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);

  return {
    props: { allPosts },
  };
};
