import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getNotoSansKrData } from "../../lib/loadFontForOg";

export const config = {
  runtime: "experimental-edge",
};

export default async function (req: NextRequest) {
  const fontNotoSansKrDataList = await getNotoSansKrData();

  const { searchParams } = new URL(req.url);
  const title = searchParams.has("title") ? searchParams.get("title") : "개발자 시우의 블로그";
  const subtitle = searchParams.has("subtitle") ? searchParams.get("subtitle") : "안녕하세요 👋";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#121212",
          fontFamily:
            '"Noto Sans KR", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
          width: "100%",
          height: "100%",
        }}
      >
        <h1
          style={{
            display: "flex",
            backgroundImage: "linear-gradient(to right, rgb(223, 56, 56), rgb(255, 200, 0))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            maxWidth: "700px",
            wordBreak: "keep-all",
            textAlign: "center",
            fontWeight: 900,
            fontSize: "90px",
          }}
        >
          {title}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "1000px",
          }}
        >
          <p
            style={{
              color: "white",
              fontWeight: 400,
              fontSize: subtitle!.length < 21 ? "50px" : "40px",
              textAlign: "center",
              overflowWrap: "break-word",
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: fontNotoSansKrDataList,
    }
  );
}
