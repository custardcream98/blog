import { readFileSync } from "fs";
import path from "path";
import React from "react";

const ROOT = process.cwd();

const backgroundLight = readFileSync(
  path.join(ROOT, "src", "lib", "thumbnails", "assets", "background-light.png"),
).toString("base64");
const backgroundDark = readFileSync(
  path.join(ROOT, "src", "lib", "thumbnails", "assets", "background-dark.png"),
).toString("base64");

const notoSansKRBlack = readFileSync(
  path.join(ROOT, "src", "lib", "thumbnails", "assets", "NotoSansKR-Black.otf"),
).toString("base64");
const notoSansKRMedium = readFileSync(
  path.join(ROOT, "src", "lib", "thumbnails", "assets", "NotoSansKR-Medium.otf"),
).toString("base64");

function Template({ title, isLight = false }: { title: string; isLight?: boolean }) {
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
          boxSizing: "border-box",
          color: isLight ? "#363636" : "#efefef",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Noto Sans KR",
          height: "100%",
          justifyContent: "space-between",
          padding: "90px",
          position: "relative",
          width: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${isLight ? backgroundLight : backgroundDark}`}
          style={{
            inset: 0,
            position: "absolute",
            zIndex: -1,
          }}
          alt=''
        />

        <p
          style={{
            fontSize: "60px",
            fontWeight: 800,
          }}
        >
          SHIWOO.DEV
        </p>

        <h1
          style={{
            borderLeft: "5px solid",
            color: "inherit",
            fontSize: "50px",
            fontWeight: 300,
            maxWidth: "700px",
            overflowWrap: "break-word",

            paddingLeft: "40px",
            wordBreak: "keep-all",
          }}
        >
          {title}
        </h1>
      </div>
    </>
  );
}

export default Template;
