export const documentTypes = [
  "Quyết định",
  "Thông báo",
  "Kế hoạch",
  "Quy chế",
  "Công văn",
] as const;
export const fields = [
  "Đào tạo",
  "Công tác sinh viên",
  "Khoa học & công nghệ",
  "Tổ chức & nhân sự",
  "Hợp tác quốc tế",
  "Tài chính",
  "Đảm bảo chất lượng",
] as const;
export type DocumentType = (typeof documentTypes)[number];
export type Field = (typeof fields)[number];
export interface PublicDocument {
  id: string;
  sign: string;
  title: string;
  type: DocumentType;
  field: Field;
  issuedAt: string;
  effectiveAt: string;
  publishedAt: string;
  issuer: string;
  featured: boolean;
  allowDownload: boolean;
  description: string;
}
const entries: [string, DocumentType, Field, string, string][] = [
  [
    "Kế hoạch tổ chức đào tạo học kỳ II năm học 2026 – 2027",
    "Kế hoạch",
    "Đào tạo",
    "2026-11-04",
    "286/KH-ĐHCN",
  ],
  [
    "Thông báo về việc xét cấp học bổng khuyến khích học tập học kỳ I năm học 2026 – 2027",
    "Thông báo",
    "Công tác sinh viên",
    "2026-11-03",
    "1248/TB-ĐHCN",
  ],
  [
    "Ban hành Quy định về hoạt động nghiên cứu khoa học của sinh viên",
    "Quyết định",
    "Khoa học & công nghệ",
    "2026-11-02",
    "1568/QĐ-ĐHCN",
  ],
  [
    "Quy chế đào tạo trình độ đại học theo hệ thống tín chỉ",
    "Quy chế",
    "Đào tạo",
    "2026-10-30",
    "18/QC-ĐHCN",
  ],
  [
    "Thông báo tuyển sinh đào tạo trình độ thạc sĩ đợt 1 năm 2027",
    "Thông báo",
    "Đào tạo",
    "2026-10-28",
    "1215/TB-ĐHCN",
  ],
  [
    "Kế hoạch tổ chức tuần sinh hoạt công dân – sinh viên năm học 2026 – 2027",
    "Kế hoạch",
    "Công tác sinh viên",
    "2026-10-26",
    "271/KH-ĐHCN",
  ],
  [
    "Hướng dẫn thực hiện công tác đánh giá, xếp loại viên chức năm 2026",
    "Công văn",
    "Tổ chức & nhân sự",
    "2026-10-24",
    "892/ĐHCN-TCHC",
  ],
  [
    "Thông báo chương trình trao đổi sinh viên quốc tế học kỳ mùa xuân 2027",
    "Thông báo",
    "Hợp tác quốc tế",
    "2026-10-22",
    "1186/TB-ĐHCN",
  ],
  [
    "Kế hoạch kiểm định chất lượng chương trình đào tạo giai đoạn 2026 – 2028",
    "Kế hoạch",
    "Đảm bảo chất lượng",
    "2026-10-20",
    "265/KH-ĐHCN",
  ],
  [
    "Quy định về quản lý và sử dụng thư viện số dành cho người học",
    "Quyết định",
    "Đào tạo",
    "2026-10-18",
    "1482/QĐ-ĐHCN",
  ],
  [
    "Thông báo mức thu học phí và thời gian hoàn thành học phí học kỳ I",
    "Thông báo",
    "Tài chính",
    "2026-10-16",
    "1142/TB-ĐHCN",
  ],
  [
    "Quy chế công tác sinh viên đối với chương trình đào tạo chính quy",
    "Quy chế",
    "Công tác sinh viên",
    "2026-10-14",
    "16/QC-ĐHCN",
  ],
  [
    "Kế hoạch tổ chức hội nghị khoa học và công nghệ năm 2026",
    "Kế hoạch",
    "Khoa học & công nghệ",
    "2026-10-12",
    "248/KH-ĐHCN",
  ],
  [
    "Hướng dẫn đăng ký đề tài nghiên cứu khoa học cấp trường",
    "Công văn",
    "Khoa học & công nghệ",
    "2026-10-10",
    "846/ĐHCN-KHCN",
  ],
  [
    "Thông báo tiếp nhận hồ sơ hỗ trợ sinh viên có hoàn cảnh khó khăn",
    "Thông báo",
    "Công tác sinh viên",
    "2026-10-08",
    "1106/TB-ĐHCN",
  ],
  [
    "Ban hành tiêu chí đánh giá chất lượng hoạt động giảng dạy",
    "Quyết định",
    "Đảm bảo chất lượng",
    "2026-10-05",
    "1395/QĐ-ĐHCN",
  ],
  [
    "Quy chế quản lý hoạt động hợp tác quốc tế",
    "Quy chế",
    "Hợp tác quốc tế",
    "2026-09-26",
    "14/QC-ĐHCN",
  ],
  [
    "Kế hoạch bồi dưỡng năng lực số cho viên chức và người lao động",
    "Kế hoạch",
    "Tổ chức & nhân sự",
    "2026-09-20",
    "224/KH-ĐHCN",
  ],
  [
    "Hướng dẫn đăng ký học phần và điều chỉnh kế hoạch học tập",
    "Công văn",
    "Đào tạo",
    "2026-09-15",
    "782/ĐHCN-ĐT",
  ],
  [
    "Quy định về xét và công nhận tốt nghiệp trình độ đại học",
    "Quyết định",
    "Đào tạo",
    "2026-09-10",
    "1250/QĐ-ĐHCN",
  ],
  [
    "Thông báo lịch nghỉ Tết Nguyên đán và kế hoạch học tập sau Tết",
    "Thông báo",
    "Đào tạo",
    "2025-12-20",
    "1458/TB-ĐHCN",
  ],
  [
    "Quy chế chi tiêu nội bộ và sử dụng nguồn kinh phí hoạt động",
    "Quy chế",
    "Tài chính",
    "2025-11-15",
    "21/QC-ĐHCN",
  ],
  [
    "Kế hoạch phát triển hoạt động đổi mới sáng tạo trong sinh viên",
    "Kế hoạch",
    "Khoa học & công nghệ",
    "2025-10-12",
    "238/KH-ĐHCN",
  ],
  [
    "Hướng dẫn triển khai khảo sát ý kiến người học năm học 2025 – 2026",
    "Công văn",
    "Đảm bảo chất lượng",
    "2025-09-10",
    "718/ĐHCN-ĐBCL",
  ],
];
export const documents: PublicDocument[] = entries.map(
  ([title, type, field, issuedAt, sign], i) => ({
    id: `demo-${String(i + 1).padStart(3, "0")}`,
    title,
    type,
    field,
    issuedAt,
    sign,
    effectiveAt: issuedAt,
    publishedAt: `${issuedAt}T09:00:00+07:00`,
    issuer: "Đại học Công nghiệp Hà Nội",
    featured: [1, 3, 4, 11].includes(i),
    allowDownload: i !== 11,
    description: `Tài liệu minh họa về ${field.toLocaleLowerCase("vi")}, dùng để trải nghiệm chức năng tra cứu và xem văn bản. Nội dung, số ký hiệu và thời gian đều là dữ liệu giả lập, không có giá trị áp dụng.`,
  }),
);
export function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLocaleLowerCase("vi")
    .trim();
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(date));
}
export interface Filters {
  q?: string;
  loai?: string;
  "linh-vuc"?: string;
  "don-vi"?: string;
  nam?: string;
  "tu-ngay"?: string;
  "den-ngay"?: string;
  "sap-xep"?: string;
  trang?: string;
  saved?: string;
}
export function filterDocuments(filters: Filters, source = documents) {
  const query = normalize((filters.q || "").slice(0, 200));
  return source
    .filter(
      (doc) =>
        (!query || normalize(`${doc.sign} ${doc.title}`).includes(query)) &&
        (!filters.loai || doc.type === filters.loai) &&
        (!filters["linh-vuc"] || doc.field === filters["linh-vuc"]) &&
        (!filters["don-vi"] || doc.issuer === filters["don-vi"]) &&
        (!filters.nam || doc.issuedAt.startsWith(filters.nam)) &&
        (!filters["tu-ngay"] || doc.issuedAt >= filters["tu-ngay"]) &&
        (!filters["den-ngay"] || doc.issuedAt <= filters["den-ngay"]),
    )
    .sort((a, b) => {
      const key =
        filters["sap-xep"] === "cong-khai" ? "publishedAt" : "issuedAt";
      return (
        (filters["sap-xep"] === "cu-nhat"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key])) || a.id.localeCompare(b.id)
      );
    });
}
export function searchHref(filters: Filters) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => !!v) as [string, string][],
  );
  return `/van-ban${params.size ? `?${params}` : ""}`;
}
