import { readFile } from "fs/promises"
import { ImageResponse } from "next/og"
import { join } from "path"

import { LogoSvg } from "@/assets/svg/LogoSvg"

const PretendardFont = await readFile(
  join(process.cwd(), "src/assets/font/Pretendard/Pretendard-Medium.otf"),
)

const D2CodingFont = await readFile(join(process.cwd(), "src/assets/font/D2Coding/D2Coding.ttf"))

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
        <LogoSvg style={{ width: "50px", height: "50px" }} />
        <div style={{ display: "flex", fontSize: "50px", fontFamily: "D2Coding" }}>shiwoo.dev</div>
      </div>
      {title && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "70px",
            marginTop: "20px",
            fontSize: "40px",
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
  return new ImageResponse(<Thumbnail title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "D2Coding",
        data: D2CodingFont,
        weight: 400,
        style: "normal",
      },
      {
        name: "Pretendard",
        data: PretendardFont,
        weight: 500,
        style: "normal",
      },
    ],
  })
}
