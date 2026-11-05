import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1050 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const reports = [];
for (const [route, name] of [
  ["/", "home-desktop"],
  ["/van-ban", "search-desktop"],
  ["/van-ban/demo-001", "detail-desktop"],
  ["/danh-muc/linh-vuc", "fields-desktop"],
  ["/huong-dan", "guide-desktop"],
  ["/demo/quan-tri", "admin-entry"],
]) {
  await page.goto(`http://127.0.0.1:3000${route}`, {
    waitUntil: "networkidle",
  });
  if (route.includes("demo-001"))
    await page.locator(".pdf-loading").waitFor({ state: "detached" });
  await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  reports.push({
    route,
    violations: result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  });
}
await page.getByRole("button", { name: "Vào không gian trải nghiệm" }).click();
await page.screenshot({ path: "artifacts/admin-desktop.png", fullPage: true });
let result = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
reports.push({
  route: "admin-dashboard",
  violations: result.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  })),
});
await page.locator(".admin-document").first().click();
await page.screenshot({ path: "artifacts/admin-review.png", fullPage: true });
result = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
reports.push({
  route: "admin-review",
  violations: result.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  })),
});
await page.getByRole("button", { name: "Đóng hộp thoại" }).click();
for (const width of [320, 375, 768, 1024]) {
  await page.setViewportSize({ width, height: 900 });
  for (const [route, name] of [
    ["/", "home"],
    ["/van-ban", "search"],
  ]) {
    await page.goto(`http://127.0.0.1:3000${route}`, {
      waitUntil: "networkidle",
    });
    await page.screenshot({
      path: `artifacts/${name}-${width}.png`,
      fullPage: true,
    });
  }
}
writeFileSync(
  "artifacts/accessibility-final.json",
  JSON.stringify({ errors, reports }, null, 2),
);
console.log(
  JSON.stringify({
    errors,
    reports: reports.map((r) => ({
      route: r.route,
      violations: r.violations.length,
    })),
  }),
);
await browser.close();
