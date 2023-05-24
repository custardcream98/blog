import styled from "styled-components";

import Meta from "src/components/Layout/Meta";
import { Container } from "src/components/Common/styledComponents";
import PostTitle from "src/components/Post/PostTitle";
import Comments from "src/components/Comments";
import PrevNextPost from "src/components/Post/PrevNextPost";
import MarkdownBody from "src/components/Common/MarkdownBody";

import {
  getPostBySlug,
  getAllPosts,
  getPrevNextPosts,
} from "src/lib/utils/posts";
import {
  getAllOgImages,
  getOgImage,
} from "src/lib/utils/ogImage";
import markdownToHtml from "src/lib/utils/markdownToHtml";
import { createPostDoc } from "src/lib/firebaseSetup/firebaseApps";
import check404 from "src/lib/check404";
import useComments from "src/lib/hook/useComments";
import generateRSSFeed from "src/lib/rss";

import type { PostType } from "src/types/post";

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
        image={post.coverImage.darkThumbnail}
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
  const coverImage = await getOgImage(post.title);

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

  const coverImages = await getAllOgImages(
    posts.map((post) => post.title)
  );

  if (process.env.NODE_ENV === "production") {
    await generateRSSFeed(
      coverImages.map(
        (coverImage) => coverImage.darkThumbnail
      )
    );
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
