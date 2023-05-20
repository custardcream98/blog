const OgTemplate = () => {
  return (
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
  );
};

export default OgTemplate;
