import { describe, expect, it } from "vitest";
import { transition, canTransition } from "../../src/lib/workflow";
describe("Quy trình mô phỏng, không phải bảo mật production", () => {
  it("đi qua đề xuất, thẩm định, duyệt và công khai", () => {
    let state = transition("DRAFT", "submit", "EDITOR");
    state = transition(state, "approve", "REVIEWER", Array(6).fill(true));
    expect(transition(state, "publish", "PUBLISHER")).toBe("PUBLISHED");
  });
  it("biên tập viên không tự duyệt hoặc công khai", () => {
    expect(canTransition("PENDING_REVIEW", "approve", "EDITOR")).toBe(false);
    expect(() => transition("APPROVED", "publish", "EDITOR")).toThrow();
  });
  it("checklist chưa đầy đủ chặn duyệt", () => {
    expect(() =>
      transition("PENDING_REVIEW", "approve", "REVIEWER", [
        true,
        true,
        true,
        true,
        true,
        false,
      ]),
    ).toThrow();
    expect(() =>
      transition("PENDING_REVIEW", "approve", "REVIEWER", []),
    ).toThrow();
  });
  it("từ chối cần lý do", () => {
    expect(() => transition("PENDING_REVIEW", "reject", "REVIEWER")).toThrow();
    expect(
      transition(
        "PENDING_REVIEW",
        "reject",
        "REVIEWER",
        [],
        "Cần chỉnh phụ lục",
      ),
    ).toBe("REJECTED");
  });
  it("thu hồi cần lý do và đúng vai trò", () => {
    expect(() =>
      transition("PUBLISHED", "revoke", "PUBLISHER", [], " "),
    ).toThrow();
    expect(
      transition("PUBLISHED", "revoke", "PUBLISHER", [], "Cập nhật tệp"),
    ).toBe("REVOKED");
  });
  it("bản thu hồi cần quay lại quy trình duyệt", () => {
    expect(() => transition("REVOKED", "publish", "PUBLISHER")).toThrow();
    expect(transition("REVOKED", "revise", "EDITOR")).toBe("DRAFT");
  });
  it("không được bỏ qua bước thẩm định", () => {
    expect(() => transition("DRAFT", "publish", "PUBLISHER")).toThrow();
    expect(() =>
      transition("PENDING_REVIEW", "publish", "PUBLISHER"),
    ).toThrow();
  });
});
