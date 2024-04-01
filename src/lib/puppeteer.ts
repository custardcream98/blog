import puppeteer, { type Browser, type Page } from "puppeteer";

export class PuppeteerBrowser {
  private static instance: PuppeteerBrowser | null;
  private browser: Browser;
  private page: Page;

  private constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  static async init(width = 1200, height = 630) {
    if (PuppeteerBrowser.instance) {
      return PuppeteerBrowser.instance;
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: {
        height,
        width,
      },
      headless: "new",
    });

    const page = await browser.newPage();

    PuppeteerBrowser.instance = new PuppeteerBrowser(browser, page);

    setTimeout(() => {
      PuppeteerBrowser.close();
    }, 600000);

    return PuppeteerBrowser.instance;
  }

  static async getScreenshot(content: string) {
    if (!PuppeteerBrowser.instance) {
      await PuppeteerBrowser.init();
    }

    if (!PuppeteerBrowser.instance) {
      throw new Error("PuppeteerBrowser instance is not initialized");
    }

    const page = PuppeteerBrowser.instance.page;

    await page.setContent(content, {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector("img", {
      timeout: 2000,
    });

    const image = await page.screenshot({
      encoding: "binary",
      omitBackground: true,
      type: "webp",
    });

    return image;
  }

  static async close() {
    if (!PuppeteerBrowser.instance) return;

    await PuppeteerBrowser.instance.browser.close();
    PuppeteerBrowser.instance = null;
  }
}
