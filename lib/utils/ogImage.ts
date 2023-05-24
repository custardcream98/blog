import { ServerSideFirebaseApp } from "lib/firebaseSetup/server";
import Template from "lib/thumbnails/Template";
import { generateThumbnailBuffer } from "lib/thumbnails/generateThumbnail";
import type { CoverImage } from "types/post";

type LightOrDark = "light" | "dark";
const lightOrDark = (isLight: boolean): LightOrDark =>
  isLight ? "light" : "dark";

const BUCKET_THUMBNAIL = "thumbnails";

const generateThumbnail = async (
  postTitle: string,
  isLight: boolean
) => {
  const thumbnailDirectory = `${BUCKET_THUMBNAIL}/${lightOrDark(
    isLight
  )}/${encodeURI(postTitle)}.webp`;

  const isThumbnailExists =
    await ServerSideFirebaseApp.isFileExists(
      thumbnailDirectory
    );

  if (!isThumbnailExists) {
    const buffer = await generateThumbnailBuffer(
      Template({
        title: postTitle,
        isLight,
      })
    );

    await ServerSideFirebaseApp.saveBufferOnBucket({
      fileName: thumbnailDirectory,
      buffer,
      makePublic: true,
    });
  }

  const thumbnailUrl =
    ServerSideFirebaseApp.getDownloadURLFromStorage(
      thumbnailDirectory
    );

  return thumbnailUrl;
};

export async function getOgImage(
  postTitle: string
): Promise<CoverImage> {
  if (process.env.NODE_ENV === "development") {
    return {
      lightThumbnail:
        "https://storage.googleapis.com/blog-e8ab2.appspot.com/thumbnails%2Flight%2FJavaScript%25EB%25A7%258C%25EC%259C%25BC%25EB%25A1%259C%2520SPA%2520%25EA%25B0%259C%25EB%25B0%259C%25ED%2595%25B4%25EB%25B3%25B4%25EA%25B8%25B0.webp",
      darkThumbnail:
        "https://storage.googleapis.com/blog-e8ab2.appspot.com/thumbnails%2Fdark%2FJavaScript%25EB%25A7%258C%25EC%259C%25BC%25EB%25A1%259C%2520SPA%2520%25EA%25B0%259C%25EB%25B0%259C%25ED%2595%25B4%25EB%25B3%25B4%25EA%25B8%25B0.webp",
    };
  }

  const resolvedPostTitle = postTitle.replace(/\//g, "-");

  return {
    lightThumbnail: await generateThumbnail(
      resolvedPostTitle,
      true
    ),
    darkThumbnail: await generateThumbnail(
      resolvedPostTitle,
      false
    ),
  };
}

export async function getAllOgImages(
  postTitles: string[]
): Promise<CoverImage[]> {
  const ogImages: CoverImage[] = [];

  for (const postTitle of postTitles) {
    console.log("Generating og image for", postTitle);

    const ogImage = await getOgImage(postTitle);
    ogImages.push(ogImage);
  }

  return ogImages;
}
