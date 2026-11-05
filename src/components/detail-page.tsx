"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  Info,
  Link2,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { documents, formatDate, type PublicDocument } from "@/lib/documents";
import { Badge, Breadcrumb, SaveButton, useDemo } from "./ui";
const PdfViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="pdf-loading">
      <span className="spinner" />
      Đang chuẩn bị trình xem PDF…
    </div>
  ),
});
export function DetailPage({ doc }: { doc: PublicDocument }) {
  const { notify } = useDemo();
  return (
    <div className="container inner-page detail-page">
      <Breadcrumb
        items={[
          { label: "Tra cứu văn bản", href: "/van-ban" },
          { label: doc.sign },
        ]}
      />
      <Link href="/van-ban" className="back-link">
        <ArrowLeft size={15} /> Trở lại danh sách
      </Link>
      <div className="detail-heading">
        <div className="document-topline">
          <Badge type={doc.type} />
          <span className="document-sign">{doc.sign}</span>
          <span className="sample-label">VĂN BẢN MẪU</span>
        </div>
        <h1>{doc.title}</h1>
        <div className="detail-actions">
          <SaveButton id={doc.id} label />
          <button
            className="button secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(location.href);
                notify("Đã sao chép liên kết văn bản");
              } catch {
                notify("Vui lòng sao chép địa chỉ trên thanh trình duyệt");
              }
            }}
          >
            <Link2 size={16} /> Sao chép liên kết
          </button>
          <button className="button secondary" onClick={() => window.print()}>
            <Printer size={16} /> In thông tin
          </button>
          {doc.allowDownload && (
            <a
              className="button primary"
              href={`/api/demo/documents/${doc.id}/file?mode=download`}
            >
              <Download size={17} /> Tải văn bản
            </a>
          )}
        </div>
      </div>
      <div className="sample-alert">
        <Info size={18} />
        <span>
          <strong>Văn bản minh họa.</strong> Nội dung được tạo cho bản demo,
          không phải văn bản chính thức và không có giá trị áp dụng.
        </span>
      </div>
      <div className="detail-layout">
        <section className="detail-main">
          <div className="panel-title">
            <FileText size={19} />
            <h2>Nội dung văn bản</h2>
            <span>PDF · 2 trang</span>
          </div>
          <PdfViewer
            key={doc.id}
            id={doc.id}
            allowDownload={doc.allowDownload}
          />
          <div className="attachment-panel">
            <h2>Tệp đính kèm</h2>
            <div className="attachment">
              <span className="attachment-icon">
                <FileText size={24} />
              </span>
              <div>
                <strong>{doc.sign.replaceAll("/", "-")}-demo.pdf</strong>
                <p>
                  Tệp PDF · 2 trang ·{" "}
                  {doc.allowDownload
                    ? "Cho phép xem và tải"
                    : "Chỉ cho phép xem"}
                </p>
              </div>
              {doc.allowDownload ? (
                <a
                  className="icon-button"
                  aria-label="Tải tệp đính kèm"
                  href={`/api/demo/documents/${doc.id}/file?mode=download`}
                >
                  <Download size={20} />
                </a>
              ) : (
                <span className="badge badge-slate">Chỉ xem</span>
              )}
            </div>
          </div>
        </section>
        <aside className="detail-sidebar">
          <div className="metadata-card">
            <h2>Thông tin văn bản</h2>
            <dl>
              {[
                ["Số, ký hiệu", doc.sign],
                ["Loại văn bản", doc.type],
                ["Lĩnh vực", doc.field],
                ["Ngày ban hành", formatDate(doc.issuedAt)],
                ["Ngày hiệu lực (mẫu)", formatDate(doc.effectiveAt)],
                ["Đơn vị ban hành (mẫu)", doc.issuer],
                ["Ngày công khai (mẫu)", formatDate(doc.publishedAt)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="metadata-footer">
              <ShieldCheck size={16} /> Dữ liệu phục vụ trải nghiệm
            </div>
          </div>
          <div className="related-card">
            <h2>Cùng lĩnh vực</h2>
            {documents
              .filter((d) => d.id !== doc.id && d.field === doc.field)
              .slice(0, 3)
              .map((d) => (
                <Link href={`/van-ban/${d.id}`} key={d.id}>
                  <span>{d.sign}</span>
                  <strong>{d.title}</strong>
                  <ArrowRight size={15} />
                </Link>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
