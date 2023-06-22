import { useIsDarkmodeActivated } from "src/app/_providers";
import { CoverImage } from "src/types/post";

import Image from "next/image";
import PlaceholderDark from "public/static/img/thumbnail-placeholder-dark.webp";
import PlaceholderLight from "public/static/img/thumbnail-placeholder-light.webp";
import { utld } from "utility-class-components";

const PLACEHOLDERS = {
  DARK: PlaceholderDark.blurDataURL,
  LIGHT: PlaceholderLight.blurDataURL,
};

const Thumbnail = utld(Image)`
  block

  rounded-[4px]

  w-full
  h-auto
`;

type Props = CoverImage & {
  title: string;
};

export function PostThumbnail({ darkThumbnail, lightThumbnail, title }: Props) {
  const isDarkmodeActivated = useIsDarkmodeActivated();
  const thumbnailAlt = title + " 썸네일";
  const thumbnailSrc = isDarkmodeActivated ? darkThumbnail : lightThumbnail;

  return (
    <Thumbnail
      key={thumbnailSrc}
      src={thumbnailSrc}
      alt={thumbnailAlt}
      priority
      width={1200}
      height={630}
      placeholder='blur'
      blurDataURL={PLACEHOLDERS[isDarkmodeActivated ? "DARK" : "LIGHT"]}
      quality={100}
    />
  );
}
