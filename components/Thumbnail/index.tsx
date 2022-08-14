import React from "react";

type Props = {
  title: string;
  subtitle: string;
};

const Thumbnail = ({ title, subtitle }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "black",
        fontFamily:
          '"Noto Sans KR", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        width: "1200px",
        height: "630px",
      }}
    >
      <h1
        style={{
          display: "flex",
          background:
            "linear-gradient(90deg, rgb(223, 56, 56), rgb(255, 200, 0))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 800,
          fontSize: "100px",
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
          height: "min-content",
        }}
      >
        <p
          style={{
            color: "white",
            fontWeight: 500,
            fontSize: subtitle.length < 21 ? "50px" : "40px",
            textAlign: "center",
            overflowWrap: "break-word",
            maxWidth: "inherit",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Thumbnail;
