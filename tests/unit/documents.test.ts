import { describe, expect, it } from "vitest";
import {
  documents,
  filterDocuments,
  formatDate,
  normalize,
  searchHref,
} from "../../src/lib/documents";
describe("Tra cứu dữ liệu mẫu", () => {
  it("chuẩn hóa tiếng Việt, chữ Đ và khoảng trắng", () => {
    expect(normalize("  ĐÀO TẠO  ")).toBe("dao tao");
  });
  it("tìm có dấu và không dấu tương đương", () => {
    expect(filterDocuments({ q: "học bổng" })).toEqual(
      filterDocuments({ q: "hoc bong" }),
    );
    expect(filterDocuments({ q: "hoc bong" })).toHaveLength(1);
  });
  it("tìm theo ký hiệu không phân biệt hoa thường", () => {
    expect(filterDocuments({ q: "1248/tb-dhcn" })[0].id).toBe("demo-002");
  });
  it("kết hợp AND giữa loại, lĩnh vực, năm và ngày", () => {
    const result = filterDocuments({
      loai: "Thông báo",
      "linh-vuc": "Đào tạo",
      nam: "2026",
      "tu-ngay": "2026-10-01",
      "den-ngay": "2026-11-01",
    });
    expect(result.map((d) => d.id)).toEqual(["demo-005"]);
  });
  it("không trả dữ liệu khi ngày đảo ngược", () => {
    expect(
      filterDocuments({ "tu-ngay": "2026-11-01", "den-ngay": "2026-10-01" }),
    ).toHaveLength(0);
  });
  it("từ khóa không tồn tại không trả kết quả", () => {
    expect(filterDocuments({ q: "khong-co-van-ban-nay" })).toHaveLength(0);
  });
  it("sắp xếp mới/cũ nhất", () => {
    expect(filterDocuments({})[0].id).toBe("demo-001");
    expect(filterDocuments({ "sap-xep": "cu-nhat" })[0].id).toBe("demo-024");
  });
  it("dùng public ID riêng biệt trong fixture", () => {
    expect(new Set(documents.map((d) => d.id)).size).toBe(24);
    expect(
      documents.every(
        (d) => d.id.startsWith("demo-") && !d.title.includes("<script"),
      ),
    ).toBe(true);
  });
  it("URL bảo toàn ký tự tiếng Việt và ký tự đặc biệt", () => {
    const url = searchHref({ q: "A&B + đào tạo", "linh-vuc": "Đào tạo" });
    expect(new URL(url, "http://localhost").searchParams.get("q")).toBe(
      "A&B + đào tạo",
    );
  });
  it("ngày hiển thị theo múi giờ Việt Nam", () => {
    expect(formatDate("2026-11-04T18:00:00Z")).toBe("05/11/2026");
  });
});
