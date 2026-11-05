import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Trang chủ: logo, tìm không dấu và bộ lọc chia sẻ được", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Tra cứu văn bản.",
  );
  await expect(page.getByAltText("Đại học Công nghiệp Hà Nội")).toBeVisible();
  await page.getByRole("textbox", { name: "Từ khóa tra cứu" }).fill("hoc bong");
  await page.getByRole("button", { name: "Tìm kiếm", exact: true }).click();
  await expect(page).toHaveURL(/q=hoc/);
  await expect(page.locator(".results-toolbar")).toContainText(
    "Tìm thấy 1 văn bản",
  );
  await page
    .getByLabel("Loại văn bản", { exact: true })
    .selectOption("Thông báo");
  await expect(page).toHaveURL(/loai=/);
  await page.reload();
  await expect(page.getByLabel("Loại văn bản", { exact: true })).toHaveValue(
    "Thông báo",
  );
  await page.getByRole("button", { name: "Đặt lại" }).click();
  await expect(page.locator(".results-toolbar")).toContainText("24");
});
test("Phân trang, sắp xếp, bộ lọc AND, trạng thái không có dữ liệu", async ({
  page,
}) => {
  await page.goto("/van-ban");
  await expect(page.locator("tbody tr")).toHaveCount(8);
  await page.getByRole("button", { name: "Trang sau", exact: true }).click();
  await expect(page).toHaveURL(/trang=2/);
  await expect(page.locator("tbody tr").first()).toContainText("265/KH-ĐHCN");
  await page.getByLabel("Sắp xếp văn bản").selectOption("cu-nhat");
  await expect(page.locator("tbody tr").first()).toContainText("718/ĐHCN-ĐBCL");
  await page.getByLabel("Năm ban hành", { exact: true }).selectOption("2025");
  await page
    .getByLabel("Loại văn bản", { exact: true })
    .selectOption("Quyết định");
  await expect(
    page.getByRole("heading", { name: "Chưa tìm thấy văn bản phù hợp" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Xóa bộ lọc", exact: true }).click();
  await expect(page.locator("tbody tr")).toHaveCount(8);
});
test("Lưu văn bản còn nguyên sau khi tải lại trang", async ({ page }) => {
  await page.goto("/van-ban/demo-001");
  await page.getByRole("button", { name: "Lưu văn bản", exact: true }).click();
  await page.goto("/van-ban?saved=1");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.reload();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Bỏ lưu văn bản", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Bạn chưa lưu văn bản nào" }),
  ).toBeVisible();
});
test("PDF thật: hiển thị, chuyển trang, zoom, tải tên đúng", async ({
  page,
}) => {
  await page.goto("/van-ban/demo-001");
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator(".pdf-loading")).toHaveCount(0);
  await page.getByRole("button", { name: "Trang PDF sau" }).click();
  await expect(page.locator(".pdf-toolbar")).toContainText("Trang 2 / 2");
  await expect(page.locator(".pdf-loading")).toHaveCount(0);
  await page.getByRole("button", { name: "Phóng to PDF" }).click();
  await expect(page.locator(".zoom-label")).toHaveText("125%");
  const downloaded = page.waitForEvent("download");
  await page.getByRole("link", { name: "Tải văn bản", exact: true }).click();
  const download = await downloaded;
  expect(download.suggestedFilename()).toBe("286-KH-ĐHCN-demo.pdf");
  await page.screenshot({
    path: "artifacts/detail-verified.png",
    fullPage: true,
  });
});
test("Tệp chỉ xem chặn download ở server; đường dẫn lạ bị từ chối", async ({
  request,
  page,
}) => {
  const preview = await request.get(
    "/api/demo/documents/demo-012/file?mode=preview",
  );
  expect(preview.status()).toBe(200);
  expect(preview.headers()["content-type"]).toBe("application/pdf");
  expect((await preview.body()).subarray(0, 5).toString()).toBe("%PDF-");
  expect(
    (
      await request.get("/api/demo/documents/demo-012/file?mode=download")
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.get("/api/demo/documents/not-real/file?mode=preview")
    ).status(),
  ).toBe(404);
  expect(
    (
      await request.get("/api/demo/documents/demo-001/file?mode=other")
    ).status(),
  ).toBe(404);
  expect((await request.get("/admin")).status()).toBe(404);
  await page.goto("/van-ban/demo-012");
  await expect(page.getByRole("link", { name: /^Tải/ })).toHaveCount(0);
});
test("XSS được hiển thị như dữ liệu và trang demo không được index", async ({
  page,
  request,
}) => {
  await page.goto("/van-ban?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E");
  await expect(
    page.getByRole("heading", { name: "Chưa tìm thấy văn bản phù hợp" }),
  ).toBeVisible();
  const response = await request.get("/");
  expect(response.headers()["x-robots-tag"]).toContain("noindex");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
});
test("Quy trình thẩm định → công khai → thu hồi, checklist và lý do", async ({
  page,
}) => {
  await page.goto("/demo/quan-tri");
  await page
    .getByRole("button", { name: "Vào không gian trải nghiệm" })
    .click();
  await page
    .locator(".admin-document")
    .filter({ hasText: "298/KH-ĐHCN" })
    .click();
  await page
    .getByRole("button", { name: "Phê duyệt hồ sơ", exact: true })
    .click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText(
    "6 bước",
  );
  for (const checkbox of await page.locator(".review-checklist input").all())
    await checkbox.check();
  await page
    .getByRole("button", { name: "Phê duyệt hồ sơ", exact: true })
    .click();
  await expect(page.locator(".review-doc-heading .status")).toHaveText(
    "Đã duyệt",
  );
  await page.getByRole("button", { name: "Đóng hộp thoại" }).click();
  await page.getByLabel("Vai trò demo").selectOption("PUBLISHER");
  await page
    .locator(".admin-document")
    .filter({ hasText: "298/KH-ĐHCN" })
    .click();
  await page
    .getByRole("button", { name: "Công khai mô phỏng", exact: true })
    .click();
  await page.getByRole("button", { name: "Xác nhận", exact: true }).click();
  await expect(page.locator(".review-doc-heading .status")).toHaveText(
    "Đã công khai",
  );
  await page
    .getByRole("button", { name: "Thu hồi bản mẫu", exact: true })
    .click();
  await expect(page.locator(".field-error")).toContainText("lý do");
  await page
    .getByRole("textbox")
    .last()
    .fill("Điều chỉnh thời gian trong tài liệu mẫu");
  await page
    .getByRole("button", { name: "Thu hồi bản mẫu", exact: true })
    .click();
  await page.getByRole("button", { name: "Xác nhận", exact: true }).click();
  await expect(page.locator(".review-doc-heading .status")).toHaveText(
    "Đã thu hồi",
  );
  await page.getByRole("button", { name: "Đóng hộp thoại" }).click();
  await page.getByRole("button", { name: "Nhật ký thao tác" }).click();
  await expect(page.locator(".admin-audit")).toContainText(
    "Điều chỉnh thời gian trong tài liệu mẫu",
  );
  await page.reload();
  await page
    .getByRole("button", { name: "Vào không gian trải nghiệm" })
    .click();
  await expect(
    page.locator(".admin-document").filter({ hasText: "298/KH-ĐHCN" }),
  ).toContainText("Đã thu hồi");
});
test("Biên tập viên tạo đề xuất, quyền mặc định chưa chọn, gửi duyệt", async ({
  page,
}) => {
  await page.goto("/demo/quan-tri");
  await page.getByRole("button", { name: /Biên tập viên/ }).click();
  await page
    .getByRole("button", { name: "Vào không gian trải nghiệm" })
    .click();
  await page.getByRole("button", { name: "Tạo đề xuất" }).click();
  await expect(page.getByLabel("Cho phép xem công khai")).not.toBeChecked();
  await page.getByLabel("Trích yếu văn bản *").fill("Hồ sơ kiểm thử giao diện");
  await page.getByLabel("Số, ký hiệu *").fill("DEMO-TEST-01");
  await page.getByLabel("Cho phép xem công khai").check();
  await page.getByRole("button", { name: "Lưu bản nháp" }).click();
  await page
    .getByRole("button", { name: "Gửi thẩm định", exact: true })
    .click();
  await expect(page.locator(".review-doc-heading .status")).toHaveText(
    "Chờ duyệt",
  );
  await expect(
    page.getByRole("button", { name: "Phê duyệt hồ sơ", exact: true }),
  ).toHaveCount(0);
});
test("Responsive: không tràn ngang tại 320, 375, 768, 1024, 1440", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/van-ban",
      "/van-ban/demo-001",
      "/danh-muc/linh-vuc",
      "/huong-dan",
      "/demo/quan-tri",
    ]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} width=${width}`,
      ).toBe(true);
    }
  }
});
test("Menu mobile, điều hướng bàn phím và hộp thoại", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Đến nội dung chính" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Mở menu" }).click();
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Tra cứu văn bản", exact: true })
    .click();
  await expect(page).toHaveURL(/van-ban/);
  await expect(page.getByRole("button", { name: "Mở menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.goto("/demo/quan-tri");
  await page
    .getByRole("button", { name: "Vào không gian trải nghiệm" })
    .click();
  await page.locator(".admin-document").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.screenshot({ path: "artifacts/admin-mobile.png", fullPage: true });
});
test("Không có lỗi truy cập nghiêm trọng trên các màn hình chính", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/van-ban",
    "/van-ban/demo-001",
    "/huong-dan",
    "/demo/quan-tri",
  ]) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
  await page
    .getByRole("button", { name: "Vào không gian trải nghiệm" })
    .click();
  let audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations, "Admin dashboard").toEqual([]);
  await page.locator(".admin-document").first().click();
  audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations, "Review dialog").toEqual([]);
});
