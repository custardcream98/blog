import { memo } from "react";
import Head from "next/head";
import { getFullURL, resolveURL } from "lib/utils/url";
import { compareArraysDeep } from "lib/utils/helper";

type MetaProps = {
  title?: string;
  description?: string;
};

type DefaultMetaProps = MetaProps & {
  type: "default";
  tags?: string[];
};

type MetaForPostProps = MetaProps & {
  type: "post";
  title: string;
  tags: string[];
  image: string;
  date: string;
};

type Props = DefaultMetaProps | MetaForPostProps;

const DEFAULT_KEYWORDS = ["HTML", "CSS", "JavaScript"];
const DEFAULT_DESCRIPTION =
  "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다.";
const DEFAULT_IMAGE = resolveURL(
  "/static/img/thumbnail.png"
);
const DEFAULT_TITLE = "FE 개발자 박시우의 기술 블로그";

const Meta = (props: Props) => {
  const isPost = props.type === "post";
  const description =
    props.description ?? DEFAULT_DESCRIPTION;
  const title =
    (props.title ? props.title + ": " : "") + DEFAULT_TITLE;
  const image = isPost ? props.image : DEFAULT_IMAGE;
  const imageAlt = isPost
    ? props.title + " 포스트 썸네일"
    : DEFAULT_TITLE;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={
          isPost
            ? props.tags.join(", ")
            : DEFAULT_KEYWORDS.join(", ")
        }
      />
      {(props.tags ?? DEFAULT_KEYWORDS).map((tag) => (
        <meta
          key={tag}
          property="article:tag"
          content={tag}
        />
      ))}

      <meta property="og:title" content={title} />
      <meta property="og:locale" content="ko_KR" />
      {isPost ? (
        <>
          <meta property="og:type" content="article" />
          <meta
            property="og:article:author"
            content="개발자 박시우"
          />
          <meta
            property="article:published_time"
            content={props.date}
          />
        </>
      ) : (
        <meta property="og:type" content="website" />
      )}
      <meta name="og:description" content={description} />
      <meta property="og:url" content={getFullURL()} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta
        property="og:site_name"
        content={DEFAULT_TITLE}
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta name="twitter:site" content="@ova_sw" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:creator" content="@ova_sw" />
    </Head>
  );
};

const isPropsEqual = (
  prevProps: Props,
  nextProps: Props
) => {
  if (prevProps.type !== nextProps.type) return false;

  const isTagsEqual =
    !!prevProps.tags &&
    !!nextProps.tags &&
    compareArraysDeep(prevProps.tags, nextProps.tags);

  if (
    prevProps.type === "post" &&
    nextProps.type === "post"
  ) {
    return (
      prevProps.title === nextProps.title &&
      prevProps.description === nextProps.description &&
      isTagsEqual &&
      prevProps.image === nextProps.image &&
      prevProps.date === nextProps.date
    );
  }

  return (
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    isTagsEqual
  );
};

export default memo(Meta, isPropsEqual);
