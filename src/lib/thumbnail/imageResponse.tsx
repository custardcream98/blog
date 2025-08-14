import { readFile } from "fs/promises"
import { ImageResponse } from "next/og"
import { join } from "path"

import { LogoSvg } from "@/assets/svg/LogoSvg"

const loadPretendardFont = () =>
  readFile(join(process.cwd(), "src/assets/font/Pretendard/Pretendard-Medium.otf"))

const loadD2CodingFont = () =>
  readFile(join(process.cwd(), "src/assets/font/D2Coding/D2Coding.ttf"))

const Thumbnail = ({ title }: { title: null | string }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        fontFamily: "Pretendard",

        backgroundColor: "#1f1f1f",
        color: "#e7e6d1",

        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          ...(title && {
            position: "absolute",
            top: "70px",
            right: "70px",
          }),
        }}
      >
        <LogoSvg style={{ width: "70px", height: "70px" }} />
        <div style={{ display: "flex", fontSize: "70px", fontFamily: "D2Coding" }}>shiwoo.dev</div>
      </div>
      {title && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "70px",
            marginTop: "20px",
            fontSize: "45px",
            width: "70%",
            wordBreak: "keep-all",
            lineHeight: "1.5",

            borderLeft: "10px solid #e7e6d1",
            paddingLeft: "20px",
          }}
        >
          {title}
        </div>
      )}
    </div>
  )
}

export const getThumbnailImageResponse = async (title: null | string) => {
  const [pretendardFont, d2CodingFont] = await Promise.all([
    loadPretendardFont(),
    loadD2CodingFont(),
  ])

  return new ImageResponse(<Thumbnail title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "D2Coding",
        data: d2CodingFont,
        weight: 400,
        style: "normal",
      },
      {
        name: "Pretendard",
        data: pretendardFont,
        weight: 500,
        style: "normal",
      },
    ],
  })
}
