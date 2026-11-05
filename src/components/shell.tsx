"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Bookmark,
  ChevronRight,
  ExternalLink,
  Globe,
  GraduationCap,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { useDemo } from "./ui";

const links = [
  { href: "/", text: "Trang chủ" },
  { href: "/van-ban", text: "Tra cứu văn bản" },
  { href: "/danh-muc/loai-van-ban", text: "Loại văn bản" },
  { href: "/danh-muc/linh-vuc", text: "Lĩnh vực" },
  { href: "/huong-dan", text: "Hướng dẫn" },
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { saved } = useDemo();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>
            <GraduationCap size={14} /> Đại học Công nghiệp Hà Nội
          </span>
          <div>
            <span className="demo-pill">BẢN DEMO</span>
            <a href="https://www.haui.edu.vn" target="_blank" rel="noreferrer">
              Website HaUI <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container brand-row">
          <Link href="/" className="brand" aria-label="HaUI – Trang chủ">
            <img
              src="/brand/haui-logo.svg"
              width="218"
              height="64"
              alt="Đại học Công nghiệp Hà Nội"
            />
          </Link>
          <div className="brand-divider" />
          <Link href="/" className="portal-brand">
            <strong>
              CỔNG THÔNG TIN
              <br />
              VĂN BẢN CÔNG KHAI
            </strong>
            <span>Minh bạch thông tin · Kết nối tri thức</span>
          </Link>
          <div className="header-actions">
            <Link className="saved-link" href="/van-ban?saved=1">
              <Bookmark size={17} />
              <span>Văn bản đã lưu</span>
              {saved.length > 0 && <b>{saved.length}</b>}
            </Link>
            <Link href="/demo/quan-tri" className="admin-link">
              <ShieldCheck size={16} />
              <span>Quản trị demo</span>
              <ChevronRight size={14} />
            </Link>
          </div>
          <button
            className="icon-button mobile-toggle"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <div className={`nav-wrap ${open ? "is-open" : ""}`}>
          <nav
            id="main-navigation"
            className="container main-nav"
            aria-label="Điều hướng chính"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  path === link.href ||
                  (link.href === "/van-ban" && path.startsWith("/van-ban/"))
                    ? "active"
                    : ""
                }
                aria-current={path === link.href ? "page" : undefined}
              >
                {link.text}
              </Link>
            ))}
            <span className="nav-spacer" />
            <span className="language">
              <Globe size={15} /> Tiếng Việt
            </span>
            <Link
              className="mobile-admin"
              href="/van-ban?saved=1"
              onClick={() => setOpen(false)}
            >
              <Bookmark size={15} /> Văn bản đã lưu{" "}
              {saved.length > 0 && `(${saved.length})`}
            </Link>
            <Link
              className="mobile-admin"
              href="/demo/quan-tri"
              onClick={() => setOpen(false)}
            >
              Quản trị demo <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <div className="footer-title">
            <ShieldCheck size={31} />
            <strong>Cổng thông tin văn bản công khai</strong>
          </div>
          <p>Đại học Công nghiệp Hà Nội</p>
          <p>
            Nguồn thông tin tập trung, thuận tiện tra cứu
            <br />
            và dễ dàng tiếp cận.
          </p>
          <a href="https://www.haui.edu.vn" target="_blank" rel="noreferrer">
            haui.edu.vn <ArrowUpRight size={15} />
          </a>
        </div>
        <div>
          <h3>Tra cứu văn bản</h3>
          <Link href="/van-ban">Tất cả văn bản</Link>
          <Link href="/danh-muc/loai-van-ban">Theo loại văn bản</Link>
          <Link href="/danh-muc/linh-vuc">Theo lĩnh vực</Link>
        </div>
        <div>
          <h3>Thông tin & hỗ trợ</h3>
          <Link href="/huong-dan">Hướng dẫn tra cứu</Link>
          <Link href="/thong-tin">Chính sách thông tin</Link>
          <Link href="/thong-tin#lien-he">
            Liên hệ, góp ý văn bản <ExternalLink size={12} />
          </Link>
        </div>
        <div className="footer-demo">
          <span className="demo-pill">KHÔNG GIAN TRẢI NGHIỆM</span>
          <p>
            Bạn đang xem giao diện demo.
            <br /> Toàn bộ văn bản là dữ liệu mẫu,
            <br /> không có giá trị áp dụng.
          </p>
          <Link href="/demo/quan-tri">
            Trải nghiệm quản trị <ArrowRightIcon />
          </Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© 2026 Đại học Công nghiệp Hà Nội</span>
        <span>
          Thiết kế vì trải nghiệm người dùng <span className="yellow-dot" />
        </span>
      </div>
    </footer>
  );
}
function ArrowRightIcon() {
  return <ArrowUpRight size={15} />;
}
