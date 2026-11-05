export type Status =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "REJECTED"
  | "REVOKED";
export type Role = "EDITOR" | "REVIEWER" | "PUBLISHER";
export type Action =
  "submit" | "approve" | "reject" | "publish" | "revoke" | "revise";
export const statuses: Record<Status, string> = {
  DRAFT: "Bản nháp",
  PENDING_REVIEW: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  PUBLISHED: "Đã công khai",
  REJECTED: "Cần chỉnh sửa",
  REVOKED: "Đã thu hồi",
};
export const roles: Record<Role, string> = {
  EDITOR: "Biên tập viên",
  REVIEWER: "Người thẩm định",
  PUBLISHER: "Người xuất bản",
};
const transitions: Record<Action, { from: Status[]; to: Status; role: Role }> =
  {
    submit: { from: ["DRAFT"], to: "PENDING_REVIEW", role: "EDITOR" },
    approve: { from: ["PENDING_REVIEW"], to: "APPROVED", role: "REVIEWER" },
    reject: { from: ["PENDING_REVIEW"], to: "REJECTED", role: "REVIEWER" },
    publish: { from: ["APPROVED"], to: "PUBLISHED", role: "PUBLISHER" },
    revoke: { from: ["PUBLISHED"], to: "REVOKED", role: "PUBLISHER" },
    revise: { from: ["REJECTED", "REVOKED"], to: "DRAFT", role: "EDITOR" },
  };
export function canTransition(status: Status, action: Action, role: Role) {
  const rule = transitions[action];
  return rule.role === role && rule.from.includes(status);
}
export function transition(
  status: Status,
  action: Action,
  role: Role,
  checks: boolean[] = [],
  reason = "",
): Status {
  if (!canTransition(status, action, role))
    throw new Error(
      "Thao tác không phù hợp với vai trò hoặc trạng thái hiện tại.",
    );
  if (action === "approve" && (checks.length !== 6 || !checks.every(Boolean)))
    throw new Error(
      "Vui lòng hoàn thành toàn bộ 6 bước kiểm tra trước khi duyệt.",
    );
  if (["reject", "revoke"].includes(action) && !reason.trim())
    throw new Error("Vui lòng nhập lý do để ghi vào lịch sử.");
  return transitions[action].to;
}
export interface Proposal {
  id: string;
  title: string;
  sign: string;
  field: string;
  status: Status;
  created: string;
  allowPreview: boolean;
  allowDownload: boolean;
  history: { text: string; at: string; role: string }[];
}
export const initialProposals: Proposal[] = [
  {
    id: "proposal-001",
    title:
      "Kế hoạch tổ chức Ngày hội việc làm và kết nối doanh nghiệp năm 2027",
    sign: "298/KH-ĐHCN",
    field: "Công tác sinh viên",
    status: "PENDING_REVIEW",
    created: "2026-11-05",
    allowPreview: true,
    allowDownload: true,
    history: [
      {
        text: "Đã gửi hồ sơ mẫu để thẩm định",
        at: "05/11/2026, 08:30",
        role: "Biên tập viên (mẫu)",
      },
    ],
  },
  {
    id: "proposal-002",
    title:
      "Thông báo đăng ký tham gia chương trình trao đổi học thuật năm 2027",
    sign: "1265/TB-ĐHCN",
    field: "Hợp tác quốc tế",
    status: "DRAFT",
    created: "2026-11-05",
    allowPreview: true,
    allowDownload: false,
    history: [
      {
        text: "Đã tạo bản nháp mẫu",
        at: "05/11/2026, 08:15",
        role: "Biên tập viên (mẫu)",
      },
    ],
  },
  {
    id: "proposal-003",
    title: "Quy định về hỗ trợ các dự án khởi nghiệp của sinh viên",
    sign: "1592/QĐ-ĐHCN",
    field: "Khoa học & công nghệ",
    status: "APPROVED",
    created: "2026-11-04",
    allowPreview: true,
    allowDownload: true,
    history: [
      {
        text: "Đã thẩm định và phê duyệt hồ sơ mẫu",
        at: "04/11/2026, 15:20",
        role: "Người thẩm định (mẫu)",
      },
    ],
  },
  {
    id: "proposal-004",
    title: "Thông báo tiếp nhận ý kiến đóng góp về dịch vụ thư viện",
    sign: "1238/TB-ĐHCN",
    field: "Đảm bảo chất lượng",
    status: "PUBLISHED",
    created: "2026-11-03",
    allowPreview: true,
    allowDownload: true,
    history: [
      {
        text: "Đã mô phỏng công khai hồ sơ",
        at: "03/11/2026, 10:00",
        role: "Người xuất bản (mẫu)",
      },
    ],
  },
  {
    id: "proposal-005",
    title: "Kế hoạch khảo sát nhu cầu sử dụng học liệu số",
    sign: "281/KH-ĐHCN",
    field: "Đào tạo",
    status: "REVOKED",
    created: "2026-11-02",
    allowPreview: true,
    allowDownload: false,
    history: [
      {
        text: "Đã thu hồi bản mẫu: cần cập nhật thời gian khảo sát",
        at: "02/11/2026, 14:00",
        role: "Người xuất bản (mẫu)",
      },
    ],
  },
];
