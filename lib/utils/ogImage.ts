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

    ogImages.push(await getOgImage(postTitle));
  }

  return ogImages;
}
