import { isDarkAtom } from "lib/atoms";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CoverImage } from "types/post";

import PlaceholderDark from "public/static/img/thumbnail-placeholder-dark.webp";
import PlaceholderLight from "public/static/img/thumbnail-placeholder-light.webp";

const PLACEHOLDERS = {
  DARK: PlaceholderDark.blurDataURL,
  LIGHT: PlaceholderLight.blurDataURL,
};

const Thumbnail = styled(Image)`
  border-radius: 4px;

  width: 100%;
  height: auto;

  display: block;
`;

type Props = CoverImage & {
  title: string;
};

const PostThumbnail = ({
  darkThumbnail,
  lightThumbnail,
  title,
}: Props) => {
  const isDarkMode = useRecoilValue(isDarkAtom);

  const thumbnailSrc = isDarkMode
    ? darkThumbnail
    : lightThumbnail;
  const thumbnailAlt = title + " 썸네일";

  return (
    <Thumbnail
      src={thumbnailSrc}
      alt={thumbnailAlt}
      priority={true}
      width={1200}
      height={630}
      placeholder="blur"
      blurDataURL={
        PLACEHOLDERS[isDarkMode ? "DARK" : "LIGHT"]
      }
      quality={100}
    />
  );
};

export default PostThumbnail;
