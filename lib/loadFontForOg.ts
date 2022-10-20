import type { SatoriOptions } from "satori";

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type Style = "normal" | "italic";

interface FontOptions {
  data: Buffer | ArrayBuffer;
  name: string;
  weight: Weight;
  style?: Style;
}

interface IFontConfig {
  url: URL;
  weight: Weight;
  style?: Style;
}

const fontLoader = (fontUrl: URL) => fetch(fontUrl).then((res) => res.arrayBuffer());

const fontNotoSansKrConfigs: IFontConfig[] = [
  {
    url: new URL("../assets/Noto_Sans_KR/NotoSansKR-Medium.otf", import.meta.url),
    weight: 500,
    style: "normal",
  },
  {
    url: new URL("../assets/Noto_Sans_KR/NotoSansKR-Black.otf", import.meta.url),
    weight: 900,
    style: "normal",
  },
];

export const getNotoSansKrData = (
  configs: IFontConfig[] = fontNotoSansKrConfigs
): Promise<FontOptions[]> =>
  Promise.all(
    configs.map(
      async (config) =>
        await fontLoader(config.url).then(
          (data): FontOptions => ({
            name: "Noto Sans KR",
            weight: config.weight,
            data,
            style: config.style ?? "normal",
          })
        )
    )
  );
