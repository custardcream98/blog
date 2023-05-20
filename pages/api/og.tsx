import { ImageResponse } from "@vercel/og";
import {
  NextApiRequest,
  NextApiResponse,
  NextConfig,
} from "next";

export const config: NextConfig = {
  runtime: "experimental-edge",
  devtool: false,
};

const fontBlack = fetch(
  new URL(
    "../../public/fonts/NotoSansKRBlack.woff",
    import.meta.url
  )
).then((res) => res.arrayBuffer());

const fontMedium = fetch(
  new URL(
    "../../public/fonts/NotoSansKRMedium.woff",
    import.meta.url
  )
).then((res) => res.arrayBuffer());

export default async function OpengraphAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fontBlackData = await fontBlack;
  const fontMediumData = await fontMedium;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Noto Sans KR",
            fontWeight: 800,
          }}
        >
          한국어 테스트
        </p>
        <div
          style={{
            fontFamily: "Noto Sans KR",
            fontWeight: 500,
          }}
        >
          작은 텍스트
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          data: fontBlackData,
          name: "Noto Sans KR",
          weight: 800,
        },
        {
          data: fontMediumData,
          name: "Noto Sans KR",
          weight: 500,
        },
      ],
    }
  );
}
