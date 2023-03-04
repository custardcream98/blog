import styled from "styled-components";

import Meta from "components/Layout/Meta";
import { Container } from "components/Common/styledComponents";
import PostTitle from "components/Post/PostTitle";
import Comments from "components/Comments";
import PrevNextPost from "components/Post/PrevNextPost";
import MarkdownBody from "components/Common/MarkdownBody";

import {
  getPostBySlug,
  getAllPosts,
  getPrevNextPosts,
  getAllOgImages,
  getOgImage,
} from "lib/utils/posts";
import markdownToHtml from "lib/utils/markdownToHtml";
import { createPostDoc } from "lib/firebaseSetup/firebaseApps";
import check404 from "lib/check404";
import useComments from "lib/hook/useComments";
import generateRSSFeed from "lib/rss";

import type PostType from "types/post";

const PostSection = styled.section`
  width: 100%;
`;

const PostContainer = styled(Container)`
  max-width: 680px;
`;

type Props = {
  post: PostType;
};

export default function Posts({ post }: Props) {
  check404();
  const postTitle = post.title.replaceAll("/", ",");
  const comments = useComments(postTitle);

  return (
    <>
      <Meta
        type="post"
        date={post.date}
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        tags={post.category}
      />
      <PostContainer>
        <PostSection>
          <PostTitle
            coverImage={post.coverImage}
            title={post.title}
            category={post.category}
            date={post.date}
            series={post.series}
          />
          <MarkdownBody content={post.content} />
        </PostSection>
        <PrevNextPost post={post} />
        <Comments postTitle={postTitle}>
          <Comments.Title>
            Comments({comments.length})
          </Comments.Title>
          <Comments.Form key={postTitle} />
          <Comments.List>
            {comments.map((commentData) => (
              <Comments.Item
                key={commentData.id}
                commentId={commentData.id}
                {...commentData}
              />
            ))}
          </Comments.List>
        </Comments>
      </PostContainer>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { slug } = params;

  const post = getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "content",
    "ogImage",
    "category",
    "series",
  ]);

  const prevNextPosts = getPrevNextPosts(slug);

  await createPostDoc(post.title);

  const content = await markdownToHtml(post.content || "");

  let coverImage = "";
  if (process.env.NODE_ENV === "production") {
    coverImage = await getOgImage(post.title);
  }

  return {
    props: {
      post: {
        ...post,
        content,
        coverImage,
        prevTitle: prevNextPosts.prevTitle ?? null,
        prevSlug: prevNextPosts.prevSlug ?? null,
        prevExcerpt: prevNextPosts.prevExcerpt ?? null,
        nextTitle: prevNextPosts.nextTitle ?? null,
        nextSlug: prevNextPosts.nextSlug ?? null,
        nextExcerpt: prevNextPosts.nextExcerpt ?? null,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "title"]);

  if (process.env.NODE_ENV !== "production") {
    const coverImages = await getAllOgImages(
      posts.map((post) => post.title)
    );
    await generateRSSFeed(coverImages);
  }

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
