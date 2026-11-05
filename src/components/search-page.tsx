"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutList,
  Search,
  SlidersHorizontal,
  Table2,
  X,
} from "lucide-react";
import {
  documents,
  documentTypes,
  fields,
  filterDocuments,
  formatDate,
  searchHref,
  type Filters,
} from "@/lib/documents";
import {
  Badge,
  Breadcrumb,
  DocumentRow,
  EmptyState,
  SaveButton,
  useDemo,
} from "./ui";
export function SearchPage() {
  const params = useSearchParams();
  const { saved } = useDemo();
  const filters = Object.fromEntries(params.entries()) as Filters;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState("table");
  const source = filters.saved
    ? documents.filter((d) => saved.includes(d.id))
    : documents;
  const results = filterDocuments(filters, source);
  const pageCount = Math.max(1, Math.ceil(results.length / 8));
  const page = Math.min(
    pageCount,
    Math.max(1, Number.parseInt(filters.trang || "1") || 1),
  );
  const visible = results.slice((page - 1) * 8, page * 8);
  const update = (key: keyof Filters, value: string) => {
    // Native history is synchronous and supported by Next useSearchParams.
    // Read the latest URL so rapid filter changes cannot overwrite one another.
    const current = Object.fromEntries(
      new URLSearchParams(window.location.search),
    ) as Filters;
    window.history.pushState(
      null,
      "",
      searchHref({
        ...current,
        [key]: value,
        trang: key === "trang" ? value : undefined,
      }),
    );
  };
  const activeFilters = Object.entries(filters).filter(
    ([k, v]) => v && !["trang", "sap-xep", "saved"].includes(k),
  );
  const clear = () =>
    window.history.pushState(
      null,
      "",
      searchHref(filters.saved ? { saved: "1" } : {}),
    );
  return (
    <div className="container inner-page">
      <Breadcrumb
        items={[
          { label: filters.saved ? "Văn bản đã lưu" : "Tra cứu văn bản" },
        ]}
      />
      <div className="page-heading">
        <div>
          <p className="eyebrow">THƯ VIỆN VĂN BẢN HAUI</p>
          <h1>{filters.saved ? "Văn bản đã lưu" : "Tra cứu văn bản"}</h1>
          <p>
            {filters.saved
              ? "Những văn bản bạn quan tâm, được lưu trên trình duyệt này."
              : "Tìm kiếm và tiếp cận thông tin công khai một cách thuận tiện."}
          </p>
        </div>
        <span className="count-pill">
          <FileText size={17} />
          {documents.length} văn bản mẫu
        </span>
      </div>
      <form
        className="listing-search"
        onSubmit={(event) => {
          event.preventDefault();
          update("q", String(new FormData(event.currentTarget).get("q") || ""));
        }}
      >
        <Search size={21} />
        <input
          key={filters.q || "all"}
          name="q"
          aria-label="Từ khóa tra cứu"
          defaultValue={filters.q}
          maxLength={200}
          placeholder="Nhập số, ký hiệu hoặc trích yếu văn bản..."
        />
        <button className="button primary" type="submit">
          Tìm kiếm <ArrowRight size={17} />
        </button>
      </form>
      <div className="search-layout">
        <aside className={`filter-panel ${filtersOpen ? "open" : ""}`}>
          <div className="filter-heading">
            <h2>
              <SlidersHorizontal size={18} /> Bộ lọc tìm kiếm
            </h2>
            <button className="text-link" onClick={clear}>
              Đặt lại
            </button>
          </div>
          <div className="filter-content">
            <label className="field-label">
              Loại văn bản
              <select
                aria-label="Loại văn bản"
                value={filters.loai || ""}
                onChange={(e) => update("loai", e.target.value)}
              >
                <option value="">Tất cả loại văn bản</option>
                {documentTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Lĩnh vực
              <select
                aria-label="Lĩnh vực"
                value={filters["linh-vuc"] || ""}
                onChange={(e) => update("linh-vuc", e.target.value)}
              >
                <option value="">Tất cả lĩnh vực</option>
                {fields.map((field) => (
                  <option key={field}>{field}</option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Đơn vị ban hành
              <select
                aria-label="Đơn vị ban hành"
                value={filters["don-vi"] || ""}
                onChange={(e) => update("don-vi", e.target.value)}
              >
                <option value="">Tất cả đơn vị</option>
                <option>Đại học Công nghiệp Hà Nội</option>
              </select>
            </label>
            <label className="field-label">
              Năm ban hành
              <select
                aria-label="Năm ban hành"
                value={filters.nam || ""}
                onChange={(e) => update("nam", e.target.value)}
              >
                <option value="">Tất cả các năm</option>
                <option>2026</option>
                <option>2025</option>
              </select>
            </label>
            <div className="filter-divider" />
            <p className="field-caption">Khoảng thời gian ban hành</p>
            <label className="field-label">
              Từ ngày
              <input
                type="date"
                value={filters["tu-ngay"] || ""}
                onChange={(e) => update("tu-ngay", e.target.value)}
              />
            </label>
            <label className="field-label">
              Đến ngày
              <input
                type="date"
                min={filters["tu-ngay"]}
                value={filters["den-ngay"] || ""}
                onChange={(e) => update("den-ngay", e.target.value)}
              />
            </label>
            {filters["tu-ngay"] &&
              filters["den-ngay"] &&
              filters["tu-ngay"] > filters["den-ngay"] && (
                <p className="field-error">
                  Ngày kết thúc phải từ ngày bắt đầu trở đi.
                </p>
              )}
            <p className="filter-tip">
              Mẹo nhỏ: Bạn có thể tìm kiếm tiếng Việt có dấu hoặc không dấu.
            </p>
          </div>
        </aside>
        <section className="search-results" aria-label="Kết quả tra cứu">
          <div className="results-toolbar">
            <p aria-live="polite">
              Tìm thấy <strong>{results.length}</strong> văn bản
            </p>
            <button
              className="button secondary filter-toggle"
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal size={16} /> Bộ lọc
            </button>
            <div className="sort-controls">
              <label>
                <span>Sắp xếp:</span>
                <select
                  aria-label="Sắp xếp văn bản"
                  value={filters["sap-xep"] || "moi-nhat"}
                  onChange={(e) => update("sap-xep", e.target.value)}
                >
                  <option value="moi-nhat">Ban hành mới nhất</option>
                  <option value="cu-nhat">Ban hành cũ nhất</option>
                  <option value="cong-khai">Mới công khai</option>
                </select>
              </label>
              <div className="view-toggle">
                <button
                  aria-label="Xem dạng bảng"
                  aria-pressed={view === "table"}
                  onClick={() => setView("table")}
                >
                  <Table2 size={18} />
                </button>
                <button
                  aria-label="Xem dạng danh sách"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>
          </div>
          {activeFilters.length > 0 && (
            <div className="active-filters">
              {activeFilters.map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => update(key as keyof Filters, "")}
                >
                  {key === "q" ? `Từ khóa: ${value}` : value}
                  <X size={13} />
                  <span className="sr-only">Bỏ bộ lọc {value}</span>
                </button>
              ))}
              <button className="clear-all" onClick={clear}>
                Xóa tất cả
              </button>
            </div>
          )}
          <div className="results-card">
            {visible.length ? (
              <>
                <div className={view === "table" ? "desktop-table" : "hidden"}>
                  <table>
                    <thead>
                      <tr>
                        <th>SỐ KÝ HIỆU / TRÍCH YẾU</th>
                        <th>LOẠI VĂN BẢN</th>
                        <th>NGÀY BAN HÀNH</th>
                        <th>
                          <span className="sr-only">Thao tác</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((doc) => (
                        <tr key={doc.id}>
                          <td>
                            <Link
                              href={`/van-ban/${doc.id}`}
                              className="table-sign"
                            >
                              {doc.sign}
                            </Link>
                            <Link
                              href={`/van-ban/${doc.id}`}
                              className="table-title"
                            >
                              {doc.title}
                            </Link>
                            <span className="table-issuer">{doc.issuer}</span>
                          </td>
                          <td>
                            <Badge type={doc.type} />
                          </td>
                          <td className="date-cell">
                            {formatDate(doc.issuedAt)}
                          </td>
                          <td>
                            <SaveButton id={doc.id} />
                            <Link
                              className="icon-button"
                              href={`/van-ban/${doc.id}`}
                              aria-label={`Xem ${doc.sign}`}
                            >
                              <ArrowRight size={16} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className={
                    view === "table" ? "mobile-results" : "list-results"
                  }
                >
                  {visible.map((doc) => (
                    <DocumentRow key={doc.id} doc={doc} />
                  ))}
                </div>
                <div className="pagination">
                  <span>
                    Hiển thị {(page - 1) * 8 + 1}–
                    {Math.min(page * 8, results.length)} / {results.length} văn
                    bản
                  </span>
                  <nav aria-label="Phân trang">
                    <button
                      disabled={page === 1}
                      onClick={() => update("trang", String(page - 1))}
                      aria-label="Trang trước"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: pageCount }, (_, i) => (
                      <button
                        key={i}
                        aria-current={page === i + 1 ? "page" : undefined}
                        onClick={() => update("trang", String(i + 1))}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      disabled={page === pageCount}
                      onClick={() => update("trang", String(page + 1))}
                      aria-label="Trang sau"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </nav>
                </div>
              </>
            ) : (
              <EmptyState
                title={
                  filters.saved && saved.length === 0
                    ? "Bạn chưa lưu văn bản nào"
                    : undefined
                }
                text={
                  filters.saved && saved.length === 0
                    ? "Nhấn biểu tượng đánh dấu bên cạnh văn bản để lưu lại và xem sau."
                    : undefined
                }
              >
                {filters.saved && saved.length === 0 ? (
                  <Link className="button primary" href="/van-ban">
                    <Bookmark size={16} /> Khám phá văn bản
                  </Link>
                ) : (
                  <button className="button secondary" onClick={clear}>
                    Xóa bộ lọc
                  </button>
                )}
              </EmptyState>
            )}
          </div>
          <div className="demo-note">
            Dữ liệu minh họa · {documents.length} văn bản mẫu phục vụ trải
            nghiệm giao diện
          </div>
        </section>
      </div>
    </div>
  );
}
