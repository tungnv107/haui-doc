# Ranh giới bảo mật

Đây là demo giao diện. Những gì đã làm: không dùng dữ liệu nội bộ, không kết nối SQL/SSO, không có admin thật, file ID allowlist, chặn tệp download theo fixture, không nhận upload, escape nội dung, noindex, no-store file, response headers cơ bản.

Những gì **chưa có** và không được xem là đã hoàn tất P0: xác thực SSO, RBAC phía server, CSRF workflow, publication DB, guard PUBLISHED/scheduled/expired/revoked, audit append-only, kiểm duyệt/scan/redaction, snapshot versions, optimistic locking, source withdrawal, revoke search/cache/file và integration tests trên SQL Server.

Mọi bản ghi mẫu đều được chủ động tạo mới. Publication statuses trong demo chỉ là dữ liệu thực hành. Việc chọn “Người thẩm định” không cấp bất kỳ quyền nào ngoài mô phỏng trong trình duyệt. Không đưa production secrets hoặc dữ liệu thật vào dự án này trước khi bổ sung nền tảng bảo mật theo master prompt.
