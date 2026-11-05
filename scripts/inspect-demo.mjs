import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
const a11y = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
writeFileSync(
  "artifacts/accessibility-initial.json",
  JSON.stringify(
    a11y.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    title: await page.title(),
    errors,
    violations: a11y.violations.map((v) => ({
      id: v.id,
      count: v.nodes.length,
    })),
  }),
);
await page.goto("http://127.0.0.1:3000/van-ban/demo-001", {
  waitUntil: "networkidle",
});
await page.waitForFunction(
  () => document.querySelector("canvas")?.width > 100,
  { timeout: 20000 },
);
await page.screenshot({ path: "artifacts/detail-desktop.png", fullPage: true });
await page.setViewportSize({ width: 375, height: 900 });
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
console.log(
  JSON.stringify({
    mobileOverflow: await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
    errors,
  }),
);
await browser.close();
