import { readFileSync } from "fs";
import path from "path";
import React from "react";

const ROOT = process.cwd();

const backgroundLight = readFileSync(
  path.join(
    ROOT,
    "lib",
    "thumbnails",
    "assets",
    "background-light.png"
  )
).toString("base64");
const backgroundDark = readFileSync(
  path.join(
    ROOT,
    "lib",
    "thumbnails",
    "assets",
    "background-dark.png"
  )
).toString("base64");

const notoSansKRBlack = readFileSync(
  path.join(
    ROOT,
    "lib",
    "thumbnails",
    "assets",
    "NotoSansKR-Black.otf"
  )
).toString("base64");
const notoSansKRMedium = readFileSync(
  path.join(
    ROOT,
    "lib",
    "thumbnails",
    "assets",
    "NotoSansKR-Medium.otf"
  )
).toString("base64");

const Template = ({
  title,
  isLight = false,
}: {
  title: string;
  isLight?: boolean;
}) => {
  return (
    <>
      <style>
        {`
          @font-face {
            font-family: 'Noto Sans KR';
            font-style: normal;
            font-weight: 800;
            src: url(data:font/otf;charset=utf-8;base64,${notoSansKRBlack}) format('opentype');
          }
          @font-face {
            font-family: 'Noto Sans KR';
            font-style: normal;
            font-weight: 300;
            src: url(data:font/otf;charset=utf-8;base64,${notoSansKRMedium}) format('opentype');
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily:
            '"Noto Sans KR", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
          width: "1200px",
          height: "630px",
          padding: "100px",
          boxSizing: "border-box",
          color: isLight ? "#363636" : "#efefef",
          position: "relative",
        }}
      >
        <img
          src={`data:image/png;base64,${
            isLight ? backgroundLight : backgroundDark
          }`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
          }}
        />
        <h1
          style={{
            color: "inherit",
            maxWidth: "700px",
            wordBreak: "keep-all",
            fontWeight: 800,
            fontSize: "50px",
            overflowWrap: "break-word",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            background:
              "linear-gradient(90deg, rgb(223, 56, 56), rgb(255, 200, 0))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",

            fontWeight: 400,
            fontSize: "30px",
            overflowWrap: "break-word",

            width: "fit-content",

            marginLeft: "auto",
          }}
        >
          shiwoo.dev
        </p>
      </div>
    </>
  );
};

export default Template;
