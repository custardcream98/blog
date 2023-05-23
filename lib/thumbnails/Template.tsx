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
            font-family: Noto Sans KR;
            font-style: normal;
            font-weight: 800;
            src: url(data:font/otf;charset=utf-8;base64,${notoSansKRBlack}) format('opentype');
          }
          @font-face {
            font-family: Noto Sans KR;
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
          fontFamily: "Noto Sans KR",
          width: "100%",
          height: "100%",
          padding: "90px",
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

        <p
          style={{
            fontWeight: 800,
            fontSize: "60px",
          }}
        >
          SHIWOO.DEV
        </p>

        <h1
          style={{
            color: "inherit",
            maxWidth: "700px",
            wordBreak: "keep-all",
            fontWeight: 300,
            fontSize: "50px",
            overflowWrap: "break-word",

            borderLeft: "5px solid",
            paddingLeft: "40px",
          }}
        >
          {title}
        </h1>
      </div>
    </>
  );
};

export default Template;
