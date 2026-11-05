"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  Eye,
  FileCheck2,
  FilePlus2,
  FileText,
  History,
  Info,
  LayoutDashboard,
  LogOut,
  Plus,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { fields, normalize } from "@/lib/documents";
import {
  canTransition,
  initialProposals,
  roles,
  statuses,
  transition,
  type Action,
  type Proposal,
  type Role,
  type Status,
} from "@/lib/workflow";
import { EmptyState, useDemo } from "./ui";
const actionLabels: Record<Action, string> = {
  submit: "Gửi thẩm định",
  approve: "Phê duyệt hồ sơ",
  reject: "Yêu cầu chỉnh sửa",
  publish: "Công khai mô phỏng",
  revoke: "Thu hồi bản mẫu",
  revise: "Tạo lại bản nháp",
};
const checklist = [
  "Văn bản đã ban hành và được phép công khai.",
  "Đã kiểm tra độ mật và thông tin nội bộ hạn chế.",
  "Đã rà soát dữ liệu cá nhân và nội dung nhạy cảm.",
  "Đã chọn rõ tệp được xem và tệp được tải.",
  "Đã xem trước đúng nội dung dành cho công chúng.",
  "Xác nhận đủ thẩm quyền và chịu trách nhiệm duyệt.",
];
function statusClass(status: Status) {
  return {
    DRAFT: "slate",
    PENDING_REVIEW: "orange",
    APPROVED: "blue",
    PUBLISHED: "green",
    REJECTED: "orange",
    REVOKED: "red",
  }[status];
}
export function AdminDemo() {
  const [entered, setEntered] = useState(false);
  const [role, setRole] = useState<Role>("REVIEWER");
  const [items, setItems] = useState(initialProposals);
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");
  const [screen, setScreen] = useState("dashboard");
  const [selected, setSelected] = useState<Proposal | null>(null);
  const [checks, setChecks] = useState<boolean[]>(Array(6).fill(false));
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState<Action | null>(null);
  const [preview, setPreview] = useState(false);
  const [creating, setCreating] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const { notify } = useDemo();
  const enter = () => {
    try {
      const parsed: unknown = JSON.parse(
        localStorage.getItem("haui-admin-demo-v1") || "null",
      );
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (p) =>
            p &&
            typeof p.id === "string" &&
            typeof p.title === "string" &&
            typeof p.sign === "string" &&
            typeof p.field === "string" &&
            typeof p.created === "string" &&
            p.status in statuses &&
            Array.isArray(p.history) &&
            p.history.every(
              (h: { text?: unknown; at?: unknown; role?: unknown }) =>
                typeof h.text === "string" &&
                typeof h.at === "string" &&
                typeof h.role === "string",
            ),
        )
      )
        setItems(parsed as Proposal[]);
    } catch {}
    setEntered(true);
  };
  useEffect(() => {
    if (entered) {
      try {
        localStorage.setItem("haui-admin-demo-v1", JSON.stringify(items));
      } catch {}
    }
  }, [items, entered]);
  useEffect(() => {
    if (selected || creating) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected, creating]);
  const close = () => {
    setSelected(null);
    setCreating(false);
    setConfirm(null);
    setPreview(false);
    setError("");
  };
  const open = (item: Proposal) => {
    setSelected(item);
    setChecks(Array(6).fill(false));
    setReason("");
    setError("");
    setConfirm(null);
    setPreview(false);
  };
  const act = (action: Action) => {
    if (!selected) return;
    try {
      const status = transition(selected.status, action, role, checks, reason);
      if (["publish", "revoke"].includes(action) && confirm !== action) {
        setConfirm(action);
        return;
      }
      const at = new Intl.DateTimeFormat("vi-VN", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Asia/Ho_Chi_Minh",
      }).format(new Date());
      const updated = {
        ...selected,
        status,
        history: [
          ...selected.history,
          {
            text: `${actionLabels[action]}${reason.trim() ? `: ${reason.trim()}` : ""}`,
            at,
            role: roles[role] + " (mô phỏng)",
          },
        ],
      };
      setItems(items.map((item) => (item.id === selected.id ? updated : item)));
      setSelected(updated);
      setConfirm(null);
      setError("");
      setChecks(Array(6).fill(false));
      setReason("");
      notify("Đã cập nhật trạng thái trong bản mô phỏng");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chưa thể hoàn tất thao tác");
    }
  };
  const filtered = items.filter(
    (item) =>
      (!filter || item.status === filter) &&
      (!query ||
        normalize(`${item.title} ${item.sign}`).includes(normalize(query))),
  );
  if (!entered)
    return (
      <div className="container admin-entry">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Trở về cổng tra cứu
        </Link>
        <div className="admin-entry-card">
          <span className="admin-entry-icon">
            <ShieldCheck size={34} />
          </span>
          <span className="sample-label">KHÔNG GIAN MÔ PHỎNG</span>
          <h1>
            Trải nghiệm
            <br />
            quản trị xuất bản
          </h1>
          <p>
            Khám phá quy trình đề xuất, thẩm định và công khai văn bản qua các
            vai trò mẫu.
          </p>
          <div className="entry-roles">
            {(Object.keys(roles) as Role[]).map((r, i) => {
              const Icon = [FilePlus2, ShieldCheck, Upload][i];
              return (
                <button
                  key={r}
                  aria-pressed={role === r}
                  onClick={() => setRole(r)}
                >
                  <Icon size={20} />
                  <div>
                    <strong>{roles[r]}</strong>
                    <span>
                      {
                        [
                          "Tạo hồ sơ và gửi thẩm định",
                          "Kiểm tra, duyệt hoặc yêu cầu chỉnh sửa",
                          "Công khai và thu hồi bản đã duyệt",
                        ][i]
                      }
                    </span>
                  </div>
                  <span className="role-radio">
                    {role === r && <Check size={12} />}
                  </span>
                </button>
              );
            })}
          </div>
          <button className="button primary enter-demo" onClick={enter}>
            Vào không gian trải nghiệm <ArrowRight size={17} />
          </button>
          <p className="entry-note">
            <Info size={15} /> Đây là mô phỏng giao diện, không phải đăng nhập
            SSO. Mọi thay đổi chỉ được lưu trong trình duyệt này.
          </p>
        </div>
      </div>
    );
  return (
    <div className="admin-surface">
      <div className="container admin-shell">
        <aside className="admin-nav">
          <div className="admin-nav-title">
            <ShieldCheck size={23} />
            <div>
              <strong>Publication Studio</strong>
              <span>QUẢN TRỊ DEMO</span>
            </div>
          </div>
          <p>KHÔNG GIAN LÀM VIỆC</p>
          <button
            className={screen === "dashboard" ? "active" : ""}
            onClick={() => {
              setScreen("dashboard");
              setFilter("");
            }}
          >
            <LayoutDashboard size={17} /> Tổng quan
          </button>
          <button
            className={screen === "documents" ? "active" : ""}
            onClick={() => {
              setScreen("documents");
              setFilter("");
            }}
          >
            <FileText size={17} /> Hồ sơ xuất bản <b>{items.length}</b>
          </button>
          <button
            className={screen === "review" ? "active" : ""}
            onClick={() => {
              setScreen("review");
              setFilter("PENDING_REVIEW");
            }}
          >
            <Clock3 size={17} /> Chờ thẩm định{" "}
            <b>{items.filter((i) => i.status === "PENDING_REVIEW").length}</b>
          </button>
          <button
            className={screen === "audit" ? "active" : ""}
            onClick={() => setScreen("audit")}
          >
            <History size={17} /> Nhật ký thao tác
          </button>
          <div className="admin-nav-bottom">
            <div className="mock-avatar">DM</div>
            <div>
              <strong>Tài khoản mẫu</strong>
              <span>{roles[role]}</span>
            </div>
            <button
              className="icon-button"
              aria-label="Thoát mô phỏng"
              onClick={() => setEntered(false)}
            >
              <LogOut size={16} />
            </button>
          </div>
        </aside>
        <section className="admin-content">
          <div className="admin-topline">
            <span>
              Không gian làm việc <ChevronRight size={12} />{" "}
              {screen === "audit" ? "Nhật ký thao tác" : "Quản lý xuất bản"}
            </span>
            <label>
              Vai trò demo
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value as Role);
                  close();
                }}
              >
                {Object.entries(roles).map(([key, label]) => (
                  <option value={key} key={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="admin-page-heading">
            <div>
              <p className="eyebrow">CHÀO MỪNG BẠN TRỞ LẠI</p>
              <h1>
                {screen === "audit"
                  ? "Nhật ký thao tác"
                  : screen === "review"
                    ? "Hồ sơ chờ thẩm định"
                    : screen === "documents"
                      ? "Hồ sơ xuất bản"
                      : "Tổng quan xuất bản"}
              </h1>
              <p>Quản lý thông tin công khai qua từng bước kiểm duyệt.</p>
            </div>
            {role === "EDITOR" && (
              <button
                className="button primary"
                onClick={() => {
                  setCreating(true);
                  setError("");
                }}
              >
                <Plus size={16} /> Tạo đề xuất
              </button>
            )}
          </div>
          <div className="admin-info">
            <Info size={17} />
            <span>
              <strong>Dữ liệu mô phỏng.</strong> Thao tác tại đây không công
              khai lên Internet và không thay đổi 24 văn bản mẫu của cổng tra
              cứu.
            </span>
          </div>
          <div className="admin-stat-grid">
            {[
              {
                label: "Tổng hồ sơ",
                value: items.length,
                icon: FileText,
                className: "blue",
                key: "",
              },
              {
                label: "Chờ thẩm định",
                value: items.filter((i) => i.status === "PENDING_REVIEW")
                  .length,
                icon: Clock3,
                className: "orange",
                key: "PENDING_REVIEW",
              },
              {
                label: "Đã công khai",
                value: items.filter((i) => i.status === "PUBLISHED").length,
                icon: FileCheck2,
                className: "green",
                key: "PUBLISHED",
              },
              {
                label: "Đã thu hồi",
                value: items.filter((i) => i.status === "REVOKED").length,
                icon: RotateCcw,
                className: "purple",
                key: "REVOKED",
              },
            ].map(({ label, value, icon: Icon, className, key }) => (
              <button
                className={`admin-stat stat-${className}`}
                key={label}
                onClick={() => {
                  setFilter(key);
                  setScreen("documents");
                }}
              >
                <div>
                  <span>{label}</span>
                  <strong>{value.toString().padStart(2, "0")}</strong>
                </div>
                <span>
                  <Icon size={22} />
                </span>
              </button>
            ))}
          </div>
          {screen === "audit" ? (
            <div className="admin-audit panel">
              <div className="admin-panel-heading">
                <h2>Lịch sử trong trình duyệt này</h2>
                <span>Nhật ký mô phỏng</span>
              </div>
              {items
                .flatMap((item) =>
                  item.history.map((entry, i) => (
                    <div className="audit-entry" key={`${item.id}-${i}`}>
                      <span>
                        <History size={16} />
                      </span>
                      <div>
                        <strong>{entry.text}</strong>
                        <p>
                          {item.sign} · {item.title}
                        </p>
                        <small>
                          {entry.at} · {entry.role}
                        </small>
                      </div>
                    </div>
                  )),
                )
                .reverse()}
            </div>
          ) : (
            <div className="admin-document-panel panel">
              <div className="admin-panel-heading">
                <h2>Danh sách hồ sơ</h2>
                <span>{filtered.length} hồ sơ mẫu</span>
              </div>
              <div className="admin-list-controls">
                <label>
                  <Search size={17} />
                  <input
                    placeholder="Tìm số ký hiệu, tên hồ sơ..."
                    aria-label="Tìm hồ sơ"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <select
                  aria-label="Lọc trạng thái hồ sơ"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">Tất cả trạng thái</option>
                  {Object.entries(statuses).map(([key, label]) => (
                    <option value={key} key={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-list">
                {filtered.length ? (
                  filtered.map((item) => (
                    <button
                      className="admin-document"
                      key={item.id}
                      onClick={() => open(item)}
                    >
                      <span className="admin-file-icon">
                        <FileText size={21} />
                      </span>
                      <div>
                        <span>
                          {item.sign} <i /> {item.field}
                        </span>
                        <strong>{item.title}</strong>
                        <small>
                          Hồ sơ mẫu · Cập nhật{" "}
                          {item.created.split("-").reverse().join("/")}
                        </small>
                      </div>
                      <span
                        className={`status status-${statusClass(item.status)}`}
                      >
                        {statuses[item.status]}
                      </span>
                      <ChevronRight size={17} />
                    </button>
                  ))
                ) : (
                  <EmptyState
                    title="Không có hồ sơ phù hợp"
                    text="Thử thay đổi từ khóa hoặc trạng thái hồ sơ."
                  />
                )}
              </div>
            </div>
          )}
          <div className="admin-process">
            <div>
              <ShieldCheck size={22} />
              <span>Quy trình công khai có kiểm soát</span>
            </div>
            <p>
              Đề xuất <ArrowRight size={12} /> Thẩm định{" "}
              <ArrowRight size={12} /> Phê duyệt <ArrowRight size={12} /> Công
              khai
            </p>
          </div>
        </section>
        <button
          className="reset-demo text-link"
          onClick={() => {
            if (
              window.confirm(
                "Khôi phục 5 hồ sơ mẫu ban đầu? Các thay đổi mô phỏng trong trình duyệt này sẽ được xóa.",
              )
            ) {
              setItems(initialProposals);
              setFilter("");
              setQuery("");
              setScreen("dashboard");
              close();
              notify("Đã khôi phục dữ liệu mô phỏng ban đầu");
            }
          }}
        >
          <RotateCcw size={14} /> Khôi phục dữ liệu mẫu
        </button>
      </div>
      <dialog
        ref={dialog}
        className="review-dialog"
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        aria-labelledby="dialog-title"
      >
        <div className="dialog-top">
          <div>
            <span className="eyebrow">KHÔNG GIAN MÔ PHỎNG</span>
            <h2 id="dialog-title">
              {creating ? "Tạo đề xuất công khai" : "Chi tiết hồ sơ xuất bản"}
            </h2>
          </div>
          <button
            className="icon-button"
            aria-label="Đóng hộp thoại"
            onClick={close}
          >
            <X size={21} />
          </button>
        </div>
        {creating ? (
          <form
            className="proposal-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const title = String(form.get("title") || "").trim();
              const sign = String(form.get("sign") || "").trim();
              if (!title || !sign) {
                setError("Vui lòng nhập trích yếu và số ký hiệu.");
                return;
              }
              const proposal: Proposal = {
                id: crypto.randomUUID(),
                title,
                sign,
                field: String(form.get("field")),
                created: new Intl.DateTimeFormat("en-CA", {
                  timeZone: "Asia/Ho_Chi_Minh",
                }).format(new Date()),
                status: "DRAFT",
                allowPreview: form.get("preview") === "on",
                allowDownload: form.get("download") === "on",
                history: [
                  {
                    text: "Đã tạo đề xuất mới trong mô phỏng",
                    at: new Intl.DateTimeFormat("vi-VN", {
                      dateStyle: "short",
                      timeStyle: "short",
                      timeZone: "Asia/Ho_Chi_Minh",
                    }).format(new Date()),
                    role: roles[role] + " (mô phỏng)",
                  },
                ],
              };
              if (!proposal.allowPreview && !proposal.allowDownload) {
                setError("Chọn ít nhất một quyền xem hoặc tải cho tệp mẫu.");
                return;
              }
              setItems([proposal, ...items]);
              setCreating(false);
              open(proposal);
              notify("Đã tạo bản nháp mẫu");
            }}
          >
            <p className="form-note">
              Nhập thông tin giả lập để trải nghiệm quy trình đề xuất.
            </p>
            <label className="field-label">
              Trích yếu văn bản *
              <textarea
                name="title"
                required
                maxLength={500}
                placeholder="Nhập tên hoặc nội dung tóm tắt văn bản..."
              />
            </label>
            <div className="form-two-columns">
              <label className="field-label">
                Số, ký hiệu *
                <input
                  name="sign"
                  required
                  maxLength={50}
                  placeholder="VD: 301/KH-ĐHCN"
                />
              </label>
              <label className="field-label">
                Lĩnh vực
                <select name="field">
                  {fields.map((field) => (
                    <option key={field}>{field}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="sample-file">
              <FileText size={24} />
              <div>
                <strong>Tệp minh họa cho hồ sơ mới</strong>
                <span>
                  Được dựng từ thông tin nhập bên trên · Không nhận tệp thật
                </span>
              </div>
            </div>
            <div className="file-permissions">
              <label>
                <input type="checkbox" name="preview" /> Cho phép xem công khai
              </label>
              <label>
                <input type="checkbox" name="download" /> Cho phép tải xuống
              </label>
            </div>
            {error && (
              <p role="alert" className="field-error">
                {error}
              </p>
            )}
            <div className="dialog-actions">
              <button
                type="button"
                className="button secondary"
                onClick={close}
              >
                Hủy
              </button>
              <button type="submit" className="button primary">
                <FilePlus2 size={16} /> Lưu bản nháp
              </button>
            </div>
          </form>
        ) : (
          selected && (
            <div className="review-body">
              <div className="review-doc-heading">
                <span
                  className={`status status-${statusClass(selected.status)}`}
                >
                  {statuses[selected.status]}
                </span>
                <span>{selected.sign}</span>
                <h3>{selected.title}</h3>
                <p>{selected.field} · Hồ sơ giả lập</p>
              </div>
              <div className="review-tabs">
                <button
                  className={!preview ? "active" : ""}
                  onClick={() => setPreview(false)}
                >
                  <CheckCheck size={16} /> Thẩm định & lịch sử
                </button>
                <button
                  className={preview ? "active" : ""}
                  onClick={() => setPreview(true)}
                >
                  <Eye size={16} /> Xem trước bản công khai
                </button>
              </div>
              {preview ? (
                <div className="admin-preview">
                  <div>BẢN XEM TRƯỚC — CHƯA CÔNG KHAI</div>
                  <span className="sample-label">VĂN BẢN MẪU</span>
                  <h2>{selected.title}</h2>
                  <dl>
                    <dt>Số ký hiệu</dt>
                    <dd>{selected.sign}</dd>
                    <dt>Lĩnh vực</dt>
                    <dd>{selected.field}</dd>
                    <dt>Đơn vị (mẫu)</dt>
                    <dd>Đại học Công nghiệp Hà Nội</dd>
                  </dl>
                  <div className="preview-paper">
                    <FileText size={34} />
                    <h3>Nội dung minh họa</h3>
                    <p>{selected.title}</p>
                    <p>
                      Hồ sơ này được tạo trong không gian mô phỏng. Không có văn
                      bản nguồn hoặc tệp E-Gov thật.
                    </p>
                  </div>
                  <p>
                    Quyền tệp:{" "}
                    {selected.allowPreview ? "Cho phép xem" : "Không cho xem"} ·{" "}
                    {selected.allowDownload ? "Cho phép tải" : "Không cho tải"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="review-permissions">
                    <ShieldCheck size={17} />
                    <span>
                      Tệp mẫu:{" "}
                      {selected.allowPreview ? "được xem" : "không được xem"} ·{" "}
                      {selected.allowDownload ? "được tải" : "không được tải"}
                    </span>
                  </div>
                  {selected.status === "PENDING_REVIEW" &&
                    role === "REVIEWER" && (
                      <div className="review-checklist">
                        <h4>
                          Checklist trước khi phê duyệt{" "}
                          <span>{checks.filter(Boolean).length}/6</span>
                        </h4>
                        <p>
                          Các xác nhận chỉ có ý nghĩa trong bài thực hành này.
                        </p>
                        {checklist.map((label, i) => (
                          <label key={label}>
                            <input
                              type="checkbox"
                              checked={checks[i]}
                              onChange={(e) =>
                                setChecks(
                                  checks.map((check, index) =>
                                    index === i ? e.target.checked : check,
                                  ),
                                )
                              }
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  <div className="review-history">
                    <h4>
                      <History size={16} /> Lịch sử hồ sơ
                    </h4>
                    {selected.history.map((h, i) => (
                      <div key={i}>
                        <span />
                        <div>
                          <strong>{h.text}</strong>
                          <small>
                            {h.at} · {h.role}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                  {((role === "REVIEWER" &&
                    selected.status === "PENDING_REVIEW") ||
                    (role === "PUBLISHER" &&
                      selected.status === "PUBLISHED")) && (
                    <label className="field-label">
                      Lý do / ghi chú (bắt buộc khi yêu cầu sửa hoặc thu hồi)
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        maxLength={500}
                        placeholder="Nhập nội dung để ghi nhận trong lịch sử..."
                      />
                    </label>
                  )}
                </>
              )}
              {error && (
                <p className="field-error" role="alert">
                  {error}
                </p>
              )}
              {confirm && (
                <div className="confirmation" role="alert">
                  <strong>
                    {confirm === "publish"
                      ? "Xác nhận mô phỏng công khai?"
                      : "Xác nhận thu hồi bản mẫu?"}
                  </strong>
                  <p>Chỉ thay đổi trạng thái trong trình duyệt hiện tại.</p>
                  <div>
                    <button
                      className="button secondary"
                      onClick={() => setConfirm(null)}
                    >
                      Hủy
                    </button>
                    <button
                      className="button primary"
                      onClick={() => act(confirm)}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              )}
              <div className="dialog-actions">
                <button className="button secondary" onClick={close}>
                  Đóng
                </button>
                {!confirm &&
                  (Object.keys(actionLabels) as Action[])
                    .filter((action) =>
                      canTransition(selected.status, action, role),
                    )
                    .map((action) => (
                      <button
                        key={action}
                        className={`button ${["reject", "revoke"].includes(action) ? "danger" : "primary"}`}
                        onClick={() => act(action)}
                      >
                        {action === "submit" ? (
                          <Send size={15} />
                        ) : action === "approve" ? (
                          <Check size={15} />
                        ) : null}
                        {actionLabels[action]}
                      </button>
                    ))}
              </div>
              {!(Object.keys(actionLabels) as Action[]).some((action) =>
                canTransition(selected.status, action, role),
              ) && (
                <p className="role-hint">
                  Vai trò {roles[role].toLowerCase()} không có thao tác ở trạng
                  thái này. Đóng hồ sơ và đổi vai trò để tiếp tục trải nghiệm.
                </p>
              )}
            </div>
          )
        )}
      </dialog>
    </div>
  );
}
