import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "experimental-edge",
};

export default function OpengraphAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        한국어 테스트
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
