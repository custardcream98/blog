import { PuppeteerBrowser } from "../puppeteer";
import { renderToString } from "react-dom/server";

export const wrapHtmlString = (htmlString: string) => {
  return `
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 1200px;
      height: 630px;
    }
    h1 {
      padding: 0;
      margin: 0;
    }
    p {
      padding: 0;
      margin: 0;
    }
  </style>
  <body>
    ${htmlString}
  </body>
  `;
};

export const htmlStringToBuffer = async (
  content: string
) => {
  const image = await PuppeteerBrowser.getScreenshot(
    content
  );

  return image as Buffer;
};

export const generateThumbnailBuffer = async (
  template: JSX.Element
) => {
  const htmlString = renderToString(template);

  const buffer = await htmlStringToBuffer(
    wrapHtmlString(htmlString)
  );

  return buffer;
};
