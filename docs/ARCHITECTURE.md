# Kiến trúc demo

```text
Browser → Next.js pages → typed fixtures (24 public demo records)
        → search/filter/sort/pagination (client, URL state)
        → bookmarks (browser localStorage)
        → PDF.js → GET /api/demo/documents/{fixtureId}/file
                    → allowlisted fixture + mode permission → data/pdf

Browser → /demo/quan-tri → local state machine + localStorage + UI history
                          (independent synthetic training records)
```

`/admin` trả 404. Không có admin API, auth adapter, SQL driver, DB access, service secrets hoặc mạng nội bộ. Public fixtures và bộ hồ sơ mô phỏng quản trị tách biệt, giải thích ngay trên UI.

PDF route lấy đường dẫn từ ID đã tra trong fixture allowlist, không nhận đường dẫn tệp từ client. Chỉ chấp nhận `preview` hoặc `download`; download bị chặn riêng đối với tệp chỉ xem. Tệp không nằm trong public; worker và logo/font được phục vụ từ chính ứng dụng. Toàn demo noindex.

Khi bước sang triển khai đầy đủ, thay fixtures bằng publication repository/server APIs; thêm SSO và RBAC phía server, publication DB, immutable snapshots, queue/outbox, approved storage và kiểm tra trạng thái tại mỗi request. Không chuyển localStorage/state machine UI thành nguồn tin cậy của hệ thống.

## Rủi ro trong phạm vi demo

- Client/localStorage có thể bị sửa: chỉ chứa dữ liệu giả, không dùng làm quyền.
- XSS từ nhập liệu: JSX escape; query giới hạn 200 ký tự, đề xuất giới hạn title/sign/reason. Chưa phải đánh giá bảo mật production.
- Tệp: allowlist ID + mode; MIME cố định; no-store và nosniff; không có upload thật.
- Nhận diện nhầm: nhãn demo, watermark PDF, noindex, giải thích giới hạn mô phỏng.
