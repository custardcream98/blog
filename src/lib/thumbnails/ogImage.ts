import { ServerSideFirebaseApp } from "src/lib/firebase";
import { generateThumbnailBuffer } from "src/lib/thumbnails/generateThumbnail";
import Template from "src/lib/thumbnails/Template";
import type { CoverImage } from "src/types/post";

type LightOrDark = "light" | "dark";
const lightOrDark = (isLight: boolean): LightOrDark => (isLight ? "light" : "dark");

const BUCKET_THUMBNAIL = "thumbnails";

const generateThumbnail = async (postTitle: string, isLight: boolean) => {
  const thumbnailDirectory = `${BUCKET_THUMBNAIL}/${lightOrDark(isLight)}/${encodeURI(
    postTitle,
  )}.webp`;

  const isThumbnailExists = await ServerSideFirebaseApp.isFileExists(thumbnailDirectory);

  if (!isThumbnailExists) {
    const buffer = await generateThumbnailBuffer(
      Template({
        isLight,
        title: postTitle,
      }),
    );

    await ServerSideFirebaseApp.saveBufferOnBucket({
      buffer,
      fileName: thumbnailDirectory,
      makePublic: true,
    });
  }

  const thumbnailUrl = ServerSideFirebaseApp.getDownloadURLFromStorage(thumbnailDirectory);

  return thumbnailUrl;
};

export async function getOgImage(postTitle: string): Promise<CoverImage> {
  if (process.env.NODE_ENV === "development" && process.env.BLOG_ENV !== "thumbnail") {
    return {
      darkThumbnail:
        "https://storage.googleapis.com/blog-e8ab2.appspot.com/thumbnails%2Fdark%2FJavaScript%25EB%25A7%258C%25EC%259C%25BC%25EB%25A1%259C%2520SPA%2520%25EA%25B0%259C%25EB%25B0%259C%25ED%2595%25B4%25EB%25B3%25B4%25EA%25B8%25B0.webp",
      lightThumbnail:
        "https://storage.googleapis.com/blog-e8ab2.appspot.com/thumbnails%2Flight%2FJavaScript%25EB%25A7%258C%25EC%259C%25BC%25EB%25A1%259C%2520SPA%2520%25EA%25B0%259C%25EB%25B0%259C%25ED%2595%25B4%25EB%25B3%25B4%25EA%25B8%25B0.webp",
    };
  }

  const resolvedPostTitle = postTitle.replace(/\//g, "-");

  return {
    darkThumbnail: await generateThumbnail(resolvedPostTitle, false),
    lightThumbnail: await generateThumbnail(resolvedPostTitle, true),
  };
}

export async function getAllOgImages(postTitles: string[]): Promise<CoverImage[]> {
  const ogImages: CoverImage[] = [];

  for await (const postTitle of postTitles) {
    console.log("Generating og image for", postTitle);

    const ogImage = await getOgImage(postTitle);
    ogImages.push(ogImage);
  }

  return ogImages;
}
