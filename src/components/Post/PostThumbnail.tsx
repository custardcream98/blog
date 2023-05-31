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
  rounded-[4px]

  w-full
  h-auto
`;

type Props = CoverImage & {
  title: string;
};

function PostThumbnail({ darkThumbnail, lightThumbnail, title }: Props) {
  const thumbnailAlt = title + " 썸네일";

  return (
    <>
      <Thumbnail
        className='hidden dark:block'
        key={darkThumbnail}
        src={darkThumbnail}
        alt={thumbnailAlt}
        priority
        width={1200}
        height={630}
        placeholder='blur'
        blurDataURL={PLACEHOLDERS.DARK}
        quality={100}
      />
      <Thumbnail
        className='block dark:hidden'
        key={lightThumbnail}
        src={lightThumbnail}
        alt={thumbnailAlt}
        priority
        width={1200}
        height={630}
        placeholder='blur'
        blurDataURL={PLACEHOLDERS.DARK}
        quality={100}
      />
    </>
  );
}

export default PostThumbnail;
