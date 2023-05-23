import { PuppeteerBrowser } from "../puppeteer";
import { renderToString } from "react-dom/server";

export const htmlStringToBuffer = async (
  htmlString: string
) => {
  const content = `
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
        <body>
          ${htmlString}
        </body>
        `;

  const image = await PuppeteerBrowser.getScreenshot(
    content
  );

  return image as Buffer;
};

type ThumbnailTemplate = ({
  title,
  isLight,
}: {
  title: string;
  isLight: boolean;
}) => JSX.Element;
export const generateThumbnailBuffer = async (
  postTitle: string,
  isLight: boolean,
  template: ThumbnailTemplate
) => {
  const htmlString = renderToString(
    template({
      title: postTitle,
      isLight,
    })
  );

  const buffer = await htmlStringToBuffer(htmlString);

  return buffer;
};
