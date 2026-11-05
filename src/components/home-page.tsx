"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  FileCheck2,
  FileText,
  FolderOpen,
  GraduationCap,
  Landmark,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { documents, documentTypes, fields, searchHref } from "@/lib/documents";
import { DocumentRow, SectionHeading } from "./ui";
export function HomePage() {
  const [tab, setTab] = useState("Tất cả");
  const recent = documents
    .filter((doc) => tab === "Tất cả" || doc.type === tab)
    .slice(0, 5);
  const icons = [FileCheck2, Megaphone, CalendarDays, BookOpen, FileText];
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span /> THÔNG TIN CÔNG KHAI, DỄ DÀNG TIẾP CẬN
            </div>
            <h1>
              Tra cứu văn bản.
              <br />
              <span>Kết nối thông tin.</span>
            </h1>
            <p>
              Cổng tra cứu văn bản công khai của Đại học Công nghiệp Hà Nội.
              <br className="desktop-br" /> Tìm đúng văn bản bạn cần, nhanh
              chóng và thuận tiện.
            </p>
            <form action="/van-ban" className="hero-search" role="search">
              <Search size={23} />
              <input
                aria-label="Từ khóa tra cứu"
                name="q"
                maxLength={200}
                placeholder="Nhập số, ký hiệu hoặc trích yếu văn bản..."
              />
              <button type="submit">
                Tìm kiếm <ArrowRight size={18} />
              </button>
            </form>
            <div className="popular-searches">
              <span>Tìm kiếm phổ biến:</span>
              {["Tuyển sinh", "Học bổng", "Quy chế đào tạo"].map((q) => (
                <Link href={searchHref({ q })} key={q}>
                  {q}
                  <ArrowUpRight size={12} />
                </Link>
              ))}
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-dot dot-one" />
            <div className="art-dot dot-two" />
            <div className="back-page" />
            <div className="art-document">
              <div className="art-doc-head">
                <div className="art-seal">
                  <Landmark size={28} />
                </div>
                <div>
                  <span>ĐẠI HỌC CÔNG NGHIỆP HÀ NỘI</span>
                  <b>CỔNG VĂN BẢN CÔNG KHAI</b>
                </div>
              </div>
              <div className="art-doc-rule" />
              <div className="art-doc-label">VĂN BẢN ĐIỆN TỬ</div>
              <div className="art-line long" />
              <div className="art-line medium" />
              <div className="art-line" />
              <div className="art-line short" />
              <div className="art-doc-box">
                <FileCheck2 size={21} />
                <div>
                  <b>Thông tin minh bạch</b>
                  <span>Tra cứu thuận tiện, mọi lúc</span>
                </div>
                <Check size={17} />
              </div>
              <div className="art-doc-bottom">
                <div className="art-line short" />
                <div className="art-stamp">
                  <Check size={28} />
                </div>
              </div>
            </div>
            <div className="floating-label">
              <span>
                <ShieldCheck size={23} />
              </span>
              <div>
                <b>Nguồn tin cậy</b>
                <small>Kết nối cộng đồng HaUI</small>
              </div>
            </div>
            <div className="floating-search">
              <Search size={25} />
            </div>
            <div className="art-spark">
              <Sparkles size={26} />
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <form action="/van-ban" className="quick-filter">
          <div className="quick-filter-label">
            <FolderOpen size={19} />
            <b>Tra cứu nhanh</b>
          </div>
          <label>
            <span className="sr-only">Loại văn bản</span>
            <select aria-label="Loại văn bản" name="loai" defaultValue="">
              <option value="">Tất cả loại văn bản</option>
              {documentTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <ChevronDown size={15} />
          </label>
          <label>
            <span className="sr-only">Lĩnh vực</span>
            <select aria-label="Lĩnh vực" name="linh-vuc" defaultValue="">
              <option value="">Tất cả lĩnh vực</option>
              {fields.map((field) => (
                <option key={field}>{field}</option>
              ))}
            </select>
            <ChevronDown size={15} />
          </label>
          <label>
            <span className="sr-only">Năm ban hành</span>
            <select aria-label="Năm ban hành" name="nam" defaultValue="">
              <option value="">Năm ban hành</option>
              <option>2026</option>
              <option>2025</option>
            </select>
            <ChevronDown size={15} />
          </label>
          <button className="quick-go" aria-label="Tra cứu theo bộ lọc">
            <ArrowRight size={21} />
          </button>
        </form>
      </div>
      <section className="container category-section">
        <SectionHeading
          eyebrow="THƯ VIỆN VĂN BẢN"
          title="Bạn đang tìm văn bản nào?"
          href="/danh-muc/loai-van-ban"
          linkText="Tất cả danh mục"
        />
        <div className="category-grid">
          {documentTypes.map((type, i) => {
            const Icon = icons[i];
            return (
              <Link
                className={`category-card category-${i}`}
                href={searchHref({ loai: type })}
                key={type}
              >
                <span className="category-icon">
                  <Icon size={24} strokeWidth={1.7} />
                </span>
                <div>
                  <h3>{type}</h3>
                  <p>
                    {documents.filter((d) => d.type === type).length} văn bản
                    mẫu
                  </p>
                </div>
                <ArrowUpRight size={17} className="category-arrow" />
              </Link>
            );
          })}
        </div>
      </section>
      <section className="container documents-section">
        <div className="recent-panel">
          <SectionHeading
            eyebrow="CẬP NHẬT THÔNG TIN"
            title="Văn bản mới công khai"
            href="/van-ban"
          />
          <div
            className="document-tabs"
            role="tablist"
            aria-label="Loại văn bản mới"
          >
            {["Tất cả", "Quyết định", "Thông báo", "Kế hoạch"].map((t) => (
              <button
                role="tab"
                aria-selected={tab === t}
                className={tab === t ? "active" : ""}
                key={t}
                onClick={() => setTab(t)}
              >
                {t}
                {t === "Tất cả" && <span>{documents.length}</span>}
              </button>
            ))}
          </div>
          <div
            className="document-list"
            role="tabpanel"
            aria-label={`Văn bản ${tab.toLowerCase()}`}
          >
            {recent.map((doc, i) => (
              <DocumentRow key={doc.id} doc={doc} isNew={i < 2} />
            ))}
          </div>
          <Link className="more-documents" href="/van-ban">
            Khám phá tất cả văn bản <ArrowRight size={16} />
          </Link>
        </div>
        <aside className="home-sidebar">
          <div className="featured-panel">
            <div className="featured-heading">
              <span>
                <Sparkles size={18} />
              </span>
              <h2>Văn bản nổi bật</h2>
            </div>
            <p className="featured-subtitle">Thông tin hữu ích dành cho bạn</p>
            {documents
              .filter((doc) => doc.featured)
              .slice(0, 3)
              .map((doc, i) => (
                <Link
                  key={doc.id}
                  href={`/van-ban/${doc.id}`}
                  className="featured-item"
                >
                  <span className="featured-number">0{i + 1}</span>
                  <div>
                    <span>{doc.field}</span>
                    <h3>{doc.title}</h3>
                  </div>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            <Link className="featured-bottom" href="/van-ban?q=quy">
              Khám phá quy định, quy chế <ArrowRight size={15} />
            </Link>
          </div>
          <div className="help-card">
            <span className="help-icon">
              <BookOpen size={24} />
            </span>
            <h3>Tra cứu dễ dàng hơn</h3>
            <p>
              Tìm hiểu cách tìm kiếm, lọc và tải văn bản chỉ trong vài bước.
            </p>
            <Link href="/huong-dan">
              Xem hướng dẫn <ArrowRight size={16} />
            </Link>
            <span className="help-decoration" aria-hidden="true">
              ?
            </span>
          </div>
        </aside>
      </section>
      <section className="field-section">
        <div className="container">
          <SectionHeading
            eyebrow="THÔNG TIN THEO CHỦ ĐỀ"
            title="Khám phá theo lĩnh vực"
            href="/danh-muc/linh-vuc"
          />
          <div className="field-grid">
            {fields.slice(0, 4).map((field, i) => {
              const Icon = [GraduationCap, BookOpen, Sparkles, Landmark][i];
              return (
                <Link href={searchHref({ "linh-vuc": field })} key={field}>
                  <span>
                    <Icon size={23} />
                  </span>
                  <div>
                    <h3>{field}</h3>
                    <p>
                      {documents.filter((d) => d.field === field).length} văn
                      bản mẫu
                    </p>
                  </div>
                  <ArrowRight size={17} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="container trust-strip">
        <ShieldCheck size={22} />
        <span>
          <strong>Thông tin rõ ràng. Tra cứu thuận tiện.</strong>{" "}
          <span>Dữ liệu trên giao diện này được tạo riêng cho bản demo.</span>
        </span>
        <a href="#main-content" aria-label="Trở về đầu trang">
          <ArrowDown size={17} style={{ transform: "rotate(180deg)" }} />
        </a>
      </section>
    </>
  );
}
