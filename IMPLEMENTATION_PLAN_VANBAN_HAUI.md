# IMPLEMENTATION PLAN — vanban.haui.edu.vn

## Bản giao diện demo theo yêu cầu ngày 05/11/2026

Phạm vi hiện tại: **duyệt giao diện và thử thao tác với dữ liệu tự tạo trước triển khai**. Checkbox của kế hoạch production bên dưới không đại diện cho tiến độ bản demo. Báo cáo thực tế: `docs/DEMO_ACCEPTANCE.md`.

- [x] Dựng project Next.js/React/TypeScript, lint, unit tests và E2E.
- [x] Trang chủ nhận diện HaUI, logo chính thức, font tiếng Việt self-hosted.
- [x] 24 văn bản mẫu / 5 loại / 7 lĩnh vực; số liệu tính từ fixtures.
- [x] Tra cứu có/không dấu, bộ lọc kết hợp và URL, sort, pagination, empty state.
- [x] Bảng desktop/card mobile, lưu văn bản, chi tiết, in metadata, sao chép liên kết.
- [x] 24 PDF thật có watermark demo, 2 trang/tệp; xem, zoom, chuyển trang, download có kiểm tra quyền fixture.
- [x] Danh mục và hướng dẫn/FAQ/chính sách demo.
- [x] Khu mô phỏng quản trị: ba vai trò, đề xuất, checklist, duyệt/từ chối, công khai/thu hồi có xác nhận và lịch sử.
- [x] 17 unit tests và 11 E2E pass; build, typecheck, lint pass.
- [x] Kiểm tra 320/375/768/1024/1440 px, ảnh desktop/mobile và axe trên 8 màn hình/trạng thái.
- [x] README, mapping, source gaps, kiến trúc và ranh giới bảo mật.
- [ ] Nghiệm thu thiết kế từ chủ dự án (chờ phản hồi sau khi xem demo).

Chưa kết nối E-Gov, SQL Server, SSO; chưa triển khai production, push hoặc publish.

**Quy tắc tiến độ:** Chỉ đánh dấu `[x]` khi đã có commit/file thực tế và kiểm thử tương ứng. Nếu thiếu truy cập DB gốc / SSO / file repository, ghi `BLOCKED` ở `docs/SOURCE_GAPS.md`; thực hiện các công việc độc lập với dữ liệu giả lập an toàn.

## Giai đoạn 0 — Khảo sát và hợp đồng tích hợp

- [x] P0.1. Đọc toàn bộ repo/`Schema.sql`, lập sơ đồ module, tooling, runtime và cấu hình hiện tại.
- [x] P0.2. Hoàn thiện `docs/DATABASE_MAPPING.md`: `Eg_VB`, `GU_HaUIDocument`, bảng danh mục và semantic (mapping ứng viên; semantics UNVERIFIED).
- [x] P0.3. Làm rõ/đánh dấu chưa xác minh `DoMat`, `allowDownload`, `GuiKhoVB`, `IsAll`, `State`, status.
- [ ] P0.4. Khảo sát `ResourceID`, `DinhKem`, `LuuTru`, hệ file/CDN/SSO và các API nguồn.
- [ ] P0.5. Viết `docs/SOURCE_GAPS.md`, `docs/ARCHITECTURE.md` và threat model phát tán dữ liệu.

## Giai đoạn 1 — Khung sản phẩm và brand HaUI

- [x] P1.1. Khởi tạo/chuẩn hóa project theo stack repo; TypeScript strict, lint, test, env.
- [x] P1.2. Thiết lập design tokens `#153C88`, `#FFCC4E`, `#FDBA4D`, `#DE2938`, `#231F20`.
- [ ] P1.3. Tích hợp logo ngang chính thức và font Be Vietnam Pro/Roboto đúng guideline.
- [ ] P1.4. Layout chung: header desktop/mobile, menu, breadcrumbs, footer, loading/error/empty.
- [x] P1.5. Responsive/accessibility smoke tests ở mobile/tablet/desktop (phạm vi demo).

## Giai đoạn 2 — Publication DB và security baseline

- [ ] P2.1. Tạo additive migrations `PUB_Documents`, `PUB_DocumentFiles`, `PUB_DocumentVersions`, `PUB_AuditLogs`.
- [ ] P2.2. Repository/service layer, public DTO allowlist, validation, query parameterization.
- [ ] P2.3. RBAC và admin authentication adapter; mock auth chỉ dùng ở dev.
- [ ] P2.4. Workflow state machine, optimistic locking, transaction/idempotency, auditor.
- [ ] P2.5. Snapshot metadata/file version, checksum, status/expiry/revoke guards.
- [ ] P2.6. Seed/test fixtures **giả lập** không chứa nội dung nội bộ.
- [ ] P2.7. Unit/integration tests P0 về deny-by-default và quyền truy cập.

## Giai đoạn 3 — API + website public

- [ ] P3.1. API public: list/search/filter/sort/pagination chỉ dữ liệu `PUBLISHED`.
- [ ] P3.2. API facets và detail qua publicID opaque, typed DTO.
- [ ] P3.3. Trang chủ với hero tìm kiếm, văn bản mới, danh mục và dữ liệu thực từ API.
- [ ] P3.4. Trang tra cứu có filter URL-shareable, table desktop/card mobile, empty states.
- [ ] P3.5. Trang chi tiết: metadata đúng nguồn, file list, share/copy, breadcrumb.
- [ ] P3.6. PDF viewer an toàn + tệp preview/download có authorization ở backend.
- [ ] P3.7. SEO chỉ publication đang public: metadata, canonical, sitemap, robots.
- [ ] P3.8. E2E mobile/desktop, tìm kiếm, paging, Unicode, bản trùng số ký hiệu.

## Giai đoạn 4 — Admin xuất bản

- [ ] P4.1. Admin list/dashboard theo role.
- [ ] P4.2. Adapter đọc nguồn phục vụ đề xuất ở mạng tin cậy, không public.
- [ ] P4.3. Form đề xuất và metadata public, chọn tệp an toàn theo từng file.
- [ ] P4.4. Checklist thẩm định, preview như khách ẩn danh, diff giữa các bản.
- [ ] P4.5. Submit/reject/approve/publish với quyền và audit.
- [ ] P4.6. Revoke/expire/republish version mới + xử lý cache.
- [ ] P4.7. Admin audit, error handling, race-condition E2E.

## Giai đoạn 5 — Tích hợp và bảo mật dữ liệu

- [ ] P5.1. Xác minh mọi semantics chưa rõ với code/API nguồn; cập nhật mapping.
- [ ] P5.2. Đồng bộ approved snapshot bằng kênh bảo mật (outbox/event/queue/schedule phù hợp).
- [ ] P5.3. File copy/scan/validation/storage private; kiểm soát URL và MIME.
- [ ] P5.4. Test phát hiện dữ liệu workflow/private trong HTML, JSON, preview, search, metadata, log.
- [ ] P5.5. Test revoked, expired, stale cache, sync failure, source withdrawal.
- [ ] P5.6. Security headers, rate limiting, CSRF, authorization, path traversal, XSS, SQLi, IDOR.

## Giai đoạn 6 — Deploy, vận hành và bàn giao

- [ ] P6.1. Dockerfile, compose cho dev/staging, `.env.example` không secret.
- [ ] P6.2. CI lint/typecheck/test/build/security scan.
- [ ] P6.3. Nginx reverse proxy, TLS/DNS docs cho `vanban.haui.edu.vn`.
- [ ] P6.4. Backup/restore/rollback migrations và publication snapshots.
- [ ] P6.5. Monitoring health/latency/sync error và log vệ sinh dữ liệu.
- [ ] P6.6. Viết `README.md`, `docs/SECURITY_PUBLICATION.md`, `docs/RELEASE_CHECKLIST.md`.
- [ ] P6.7. Chạy acceptance E2E; tất cả security P0 pass; báo cáo kết quả có log.
- [ ] P6.8. Nghiệm thu UI theo guideline HaUI ở màn hình desktop/mobile.

## Điều kiện chặn triển khai production (release gates)

- [ ] G1. Có người/đơn vị có thẩm quyền duyệt chính sách công khai, role và phân loại bí mật.
- [ ] G2. Đã xác minh ý nghĩa các cột trạng thái và file storage nguồn.
- [ ] G3. Credentials, network/firewall, SSO, HTTPS, secret rotation production đã cấu hình đúng.
- [ ] G4. Không tồn tại public query đến nội dung chưa `PUBLISHED`, private documents hay tệp chưa duyệt.
- [ ] G5. Revoke kiểm thử thành công từ API, HTML, PDF, tìm kiếm, sitemap và cache.
- [ ] G6. Tất cả P0 pass, migration/backup/rollback và deploy runbook được kiểm tra.

## Mẫu báo cáo từng vòng

```text
Giai đoạn:
Task hoàn tất [x]:
Files changed:
Lệnh đã chạy:
Kết quả test:
Gaps/Blocked:
Công việc tiếp theo:
```
