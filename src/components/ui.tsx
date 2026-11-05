"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  FileText,
  SearchX,
  X,
} from "lucide-react";
import { formatDate, type PublicDocument } from "@/lib/documents";

const DemoContext = createContext<{
  saved: string[];
  toggleSaved: (id: string) => void;
  notify: (message: string) => void;
}>({ saved: [], toggleSaved: () => {}, notify: () => {} });
function subscribeSaved(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener("haui-saved-change", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("haui-saved-change", listener);
  };
}
function getSavedSnapshot() {
  try {
    return localStorage.getItem("haui-saved-v1") || "[]";
  } catch {
    return "[]";
  }
}
export function DemoProvider({ children }: { children: ReactNode }) {
  const rawSaved = useSyncExternalStore(
    subscribeSaved,
    getSavedSnapshot,
    () => "[]",
  );
  const saved = useMemo(() => {
    try {
      const stored: unknown = JSON.parse(rawSaved);
      return Array.isArray(stored)
        ? stored.filter((s): s is string => typeof s === "string")
        : [];
    } catch {
      return [];
    }
  }, [rawSaved]);
  const [toast, setToast] = useState("");
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const toggleSaved = (id: string) => {
    const next = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];
    try {
      localStorage.setItem("haui-saved-v1", JSON.stringify(next));
      window.dispatchEvent(new Event("haui-saved-change"));
    } catch {
      setToast("Trình duyệt chưa cho phép lưu cục bộ");
      return;
    }
    setToast(
      next.includes(id)
        ? "Đã lưu văn bản vào danh sách của bạn"
        : "Đã bỏ lưu văn bản",
    );
  };
  return (
    <DemoContext.Provider value={{ saved, toggleSaved, notify: setToast }}>
      {children}
      <div aria-live="polite" className={`toast ${toast ? "visible" : ""}`}>
        {toast && (
          <>
            <Check size={19} />
            <span>{toast}</span>
            <button aria-label="Đóng thông báo" onClick={() => setToast("")}>
              <X size={16} />
            </button>
          </>
        )}
      </div>
    </DemoContext.Provider>
  );
}
export const useDemo = () => useContext(DemoContext);
export function Badge({ type }: { type: string }) {
  return (
    <span
      className={`badge badge-${{ "Quyết định": "blue", "Thông báo": "orange", "Kế hoạch": "green", "Quy chế": "purple", "Công văn": "slate" }[type] || "blue"}`}
    >
      {type}
    </span>
  );
}
export function SaveButton({
  id,
  label = false,
}: {
  id: string;
  label?: boolean;
}) {
  const { saved, toggleSaved } = useDemo();
  const active = saved.includes(id);
  return (
    <button
      className={label ? "button secondary" : "icon-button save-button"}
      aria-label={active ? "Bỏ lưu văn bản" : "Lưu văn bản"}
      aria-pressed={active}
      onClick={() => toggleSaved(id)}
      title={active ? "Bỏ lưu văn bản" : "Lưu văn bản"}
    >
      <Bookmark size={18} fill={active ? "currentColor" : "none"} />
      {label && (active ? "Đã lưu" : "Lưu văn bản")}
    </button>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Đường dẫn" className="breadcrumb">
      <Link href="/">Trang chủ</Link>
      {items.map((item, i) => (
        <span key={i}>
          <ChevronRight size={13} />
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function DocumentRow({
  doc,
  isNew = false,
}: {
  doc: PublicDocument;
  isNew?: boolean;
}) {
  return (
    <article className="document-row">
      <div
        className={`doc-icon icon-${doc.type === "Thông báo" ? "orange" : doc.type === "Kế hoạch" ? "green" : "blue"}`}
      >
        <FileText size={23} />
        <span>PDF</span>
      </div>
      <div className="document-row-main">
        <div className="document-topline">
          <Badge type={doc.type} />
          <span className="document-sign">{doc.sign}</span>
          {isNew && <span className="new-label">MỚI</span>}
        </div>
        <Link className="document-title" href={`/van-ban/${doc.id}`}>
          {doc.title}
        </Link>
        <div className="document-meta">
          <span>Ban hành: {formatDate(doc.issuedAt)}</span>
          <i />
          <span>{doc.field}</span>
        </div>
      </div>
      <SaveButton id={doc.id} />
    </article>
  );
}
export function EmptyState({
  title = "Chưa tìm thấy văn bản phù hợp",
  text = "Thử thay đổi từ khóa hoặc bỏ bớt bộ lọc để có thêm kết quả.",
  children,
}: {
  title?: string;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <SearchX size={32} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  href,
  linkText = "Xem tất cả",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-link">
          {linkText}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
