import { PuppeteerBrowser } from "../puppeteer"

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
  `
}

export const htmlStringToBuffer = async (content: string) => {
  const image = await PuppeteerBrowser.getScreenshot(content)

  return image
}

export const generateThumbnailBuffer = async (template: JSX.Element) => {
  const ReactDOMServer = (await import("react-dom/server")).default
  const htmlString = ReactDOMServer.renderToString(template)

  const buffer = await htmlStringToBuffer(wrapHtmlString(htmlString))

  return buffer
}
