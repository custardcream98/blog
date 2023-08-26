import { getAllPosts, getPostBySlug } from "src/app/data";
import { Container } from "src/components";
import { FONT_D2_CODING, FONT_NOTO_SERIF_KR } from "src/fonts";
import { compilePostMDX } from "src/lib/mdx";
import generateRSSFeed from "src/lib/rss";
import { getAllOgImages } from "src/lib/thumbnails/ogImage";

import { Comments, PostTitle, PrevNextPost } from "./_components";
import { createPostDoc, getPrevNextPosts } from "./data";
import { HydratePostQueryClient } from "./hydrate";
import type { PostPageParams } from "./types";

import { utld } from "utility-class-components";

export { generateMetadata } from "./metadata";

export const revalidate = 0; // 3rd party library인 RQ의 QueryClient cache의 cacheTime을 조절하기 위해 사용
// TODO: 추후 각 3rd party request마다 revalidate를 다르게 하는 기능이 Next에 추가되면 변경 필요

const createAllPostDocs = (posts: { title: string }[]) =>
  Promise.all(posts.map((post) => createPostDoc(post.title)));

export const generateStaticParams = async () => {
  const posts = await getAllPosts(["slug", "title"]);

  if (process.env.NODE_ENV === "production") {
    const coverImages = await getAllOgImages(posts.map((post) => post.title));
    const darkTumbnails = coverImages.map(({ darkThumbnail }) => darkThumbnail);
    await generateRSSFeed(darkTumbnails);
    await createAllPostDocs(posts);
  }

  return posts.map(({ slug }) => ({
    slug,
  }));
};

export default async function PostsDynamicPage({ params: { slug } }: PostPageParams) {
  const { coverImage, title, category, date, series, content } = await getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "content",
    "category",
    "series",
    "coverImage",
  ]);

  const prevNextPosts = await getPrevNextPosts(slug);

  const postTitleForComments = title.replaceAll("/", ",");

  const postContent = await compilePostMDX(content);

  return (
    <HydratePostQueryClient title={title} titleForComments={postTitleForComments}>
      <PostContainer>
        <PostSection>
          <PostTitle
            coverImage={coverImage}
            title={title}
            category={category}
            date={date}
            series={series}
          />
          {postContent}
        </PostSection>
        <PrevNextPost key={slug} {...prevNextPosts} />
        {(process.env.BLOG_ENV === "query" || process.env.NODE_ENV === "production") && (
          <Comments postTitle={postTitleForComments} />
        )}
      </PostContainer>
    </HydratePostQueryClient>
  );
}

const FONTS = [FONT_D2_CODING.variable, FONT_NOTO_SERIF_KR.variable];

const PostContainer = utld(Container)`
  !max-w-[42.5rem]

  ${FONTS}
`;

const PostSection = utld.section`
  w-full
`;
