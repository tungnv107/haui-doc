# Checklist bàn giao demo và điều kiện triển khai thật

## Demo UI

- [x] Có fixtures tự tạo và nhãn demo trên UI/tệp.
- [x] Không kết nối DB/SSO/file storage nội bộ.
- [x] Chạy tại localhost và chặn index.
- [x] Logo chính thức lưu cục bộ, font tiếng Việt tự phục vụ.
- [x] PDF minh họa đã render và kiểm tra chữ tiếng Việt/watermark.
- [x] Hoàn tất kiểm chứng UI cuối cùng; xem docs/DEMO_ACCEPTANCE.md.

## Trước production — chưa thực hiện

- [ ] Chủ dự án duyệt giao diện và phạm vi nghiệp vụ.
- [ ] Xác minh schema semantics, file service, SSO và quyền.
- [ ] Triển khai publication DB/API/SSO/RBAC/audit/approved file storage.
- [ ] Loại bỏ role switcher và mọi giả định của demo khỏi môi trường thật.
- [ ] Kiểm thử security P0 đầy đủ, SQL integration, revoke/snapshot/CSRF/IDOR/race.
- [ ] Backup/rollback/observability, TLS, security headers, rate limit, deploy runbook.
- [ ] Được yêu cầu rõ ràng trước khi deploy/publish/push.
