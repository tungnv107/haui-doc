import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  FileCheck2,
  FileText,
  GraduationCap,
  Landmark,
  Megaphone,
  Microscope,
  Users,
  Wallet,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui";
import { documents, documentTypes, fields, searchHref } from "@/lib/documents";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ kind: string }>;
}) {
  return {
    title:
      (await params).kind === "linh-vuc" ? "Lĩnh vực văn bản" : "Loại văn bản",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ kind: string }>;
}) {
  const { kind } = await params;
  if (!["loai-van-ban", "linh-vuc"].includes(kind)) notFound();
  const isType = kind === "loai-van-ban";
  const title = isType ? "Tra cứu theo loại văn bản" : "Khám phá theo lĩnh vực";
  const items = isType ? documentTypes : fields;
  const icons = isType
    ? [FileCheck2, Megaphone, CalendarDays, BookOpen, FileText]
    : [GraduationCap, Users, Microscope, Landmark, Globe, Wallet, ShieldCheck];
  const descriptions = isType
    ? [
        "Các quyết định ban hành quy định và tổ chức thực hiện.",
        "Thông tin, lịch trình và thông báo từ nhà trường.",
        "Kế hoạch triển khai hoạt động theo từng giai đoạn.",
        "Quy chế, nguyên tắc và hướng dẫn áp dụng.",
        "Các văn bản hướng dẫn và trao đổi công việc.",
      ]
    : [
        "Chương trình, kế hoạch học tập và quy định đào tạo.",
        "Học bổng, chính sách và hoạt động dành cho sinh viên.",
        "Nghiên cứu, sáng tạo và ứng dụng công nghệ.",
        "Quy định về tổ chức, viên chức và người lao động.",
        "Kết nối học thuật và chương trình trao đổi quốc tế.",
        "Học phí, nguồn kinh phí và chính sách tài chính.",
        "Kiểm định, khảo sát và cải tiến chất lượng.",
      ];
  return (
    <div className="container inner-page">
      <Breadcrumb items={[{ label: isType ? "Loại văn bản" : "Lĩnh vực" }]} />
      <div className="page-heading">
        <div>
          <p className="eyebrow">DANH MỤC TRA CỨU</p>
          <h1>{title}</h1>
          <p>Lựa chọn chủ đề bạn quan tâm để tìm thấy thông tin phù hợp.</p>
        </div>
      </div>
      <div className="directory-grid">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <Link
              className={`directory-card category-${i % 5}`}
              href={searchHref({ [isType ? "loai" : "linh-vuc"]: item })}
              key={item}
            >
              <span className="category-icon">
                <Icon size={28} />
              </span>
              <h2>{item}</h2>
              <p>{descriptions[i]}</p>
              <div>
                <span>
                  {
                    documents.filter(
                      (d) => (isType ? d.type : d.field) === item,
                    ).length
                  }{" "}
                  văn bản mẫu
                </span>
                <ArrowUpRight size={20} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
