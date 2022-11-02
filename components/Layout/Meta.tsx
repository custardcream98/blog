import Head from "next/head";
import getFullURL from "../../lib/url";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
};

const Meta = ({ title, description, image, tags }: Props) => {
  return (
    <Head>
      <title>{(title ? title + ": " : "") + "FE 개발자 박시우의 기술 블로그"}</title>
      <meta
        property="og:title"
        content={(title ? title + ": " : "") + "FE 개발자 박시우의 기술 블로그"}
      />
      <meta
        name="description"
        content={
          description ??
          "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다."
        }
      />
      <meta
        name="og:description"
        content={
          description ??
          "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다."
        }
      />
      <meta property="og:url" content={getFullURL()} />
      <meta property="og:image" content={image ?? "/static/img/thumbnail.png"} />
      <meta name="keywords" content={tags?.join(", ") ?? "HTML, CSS, JavaScript"}></meta>

      <meta property="og:article:author" content="개발자 박시우" />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default Meta;
