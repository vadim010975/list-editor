import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("adding product", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeEach(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: "new",
      // slowMo: 100,
      // devtools: true,
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("testing adding product", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector(".plus");
    const btnPlus = await page.$(".plus");
    await page.waitForSelector(".list-items");
    const containerEl = await page.$(".list-items");
    btnPlus.click();
    await page.waitForSelector(".form.popup");
    const formEl = await page.$(".form.popup");
    const inputName = await formEl.$(".name");
    const inputPrice = await formEl.$(".price");
    const btnSubmit = await formEl.$(".submit");
    await inputName.type("phone");
    await inputPrice.type("10000");
    await btnSubmit.click();
    await page.waitForSelector(".form.popup.hidden");
    await containerEl.waitForSelector("#phone");
    const result = await page.evaluate(() => {
      return document.querySelector("#phone").querySelector(".name")
        .textContent;
    });
    await expect(result).toBe("phone");
  });
});
