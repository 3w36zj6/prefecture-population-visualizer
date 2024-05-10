import { expect, test } from "@playwright/test";

test("ページを開く", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("都道府県を選択する", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByRole("checkbox", { name: "北海道" }).check();
  await page.getByRole("checkbox", { name: "東京都" }).check();
  await page.getByRole("checkbox", { name: "愛知県" }).check();
  await page.getByRole("checkbox", { name: "大阪府" }).check();
  await page.getByRole("checkbox", { name: "福岡県" }).check();

  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("都道府県と人口カテゴリを選択する", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByRole("checkbox", { name: "北海道" }).check();
  await page.getByRole("checkbox", { name: "東京都" }).check();
  await page.getByRole("checkbox", { name: "愛知県" }).check();
  await page.getByRole("checkbox", { name: "大阪府" }).check();
  await page.getByRole("checkbox", { name: "福岡県" }).check();

  await page.getByRole("radio", { name: "生産年齢人口" }).check();

  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("グラフが表示された後に都道府県を変更する", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByRole("checkbox", { name: "北海道" }).check();
  await page.getByRole("checkbox", { name: "東京都" }).check();
  await page.getByRole("checkbox", { name: "愛知県" }).check();
  await page.getByRole("checkbox", { name: "大阪府" }).check();
  await page.getByRole("checkbox", { name: "福岡県" }).check();

  await page.getByRole("radio", { name: "生産年齢人口" }).check();

  await page.getByRole("checkbox", { name: "北海道" }).uncheck();
  await page.getByRole("checkbox", { name: "愛知県" }).uncheck();

  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({ fullPage: true });
});
