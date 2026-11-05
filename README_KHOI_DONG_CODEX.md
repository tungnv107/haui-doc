# HƯỚNG DẪN KHỞI ĐỘNG CODEX — vanban.haui.edu.vn

## Bộ tài liệu

1. `Schema.sql` — Schema SQL Server `[HauiEgov]` do chủ dự án cung cấp, không chứa dữ liệu mẫu.
2. `PROMPT_CODEX_VANBAN_HAUI.md` — yêu cầu sản phẩm/kiến trúc/UI/API/kiểm thử/bảo mật.
3. `IMPLEMENTATION_PLAN_VANBAN_HAUI.md` — kế hoạch triển khai checkbox để Codex cập nhật liên tục.

## Cách dùng

- Đưa các tệp vào thư mục làm việc Codex, cùng repo hiện hữu (nếu có).
- Chạy Codex trong workspace chứa dự án, cấp quyền truy cập repository. Không đưa thông tin đăng nhập production vào prompt.
- Dán chỉ thị sau:

> Hãy đọc **toàn bộ** các tệp `PROMPT_CODEX_VANBAN_HAUI.md`, `IMPLEMENTATION_PLAN_VANBAN_HAUI.md` và `Schema.sql` trước khi thay đổi mã. Thực hiện triển khai thực tế website `vanban.haui.edu.vn` theo master prompt, ưu tiên reuse hệ thống hiện hữu, tuân thủ cơ chế chỉ công khai văn bản đã duyệt. Sau mỗi task phải kiểm thử, cập nhật checkbox kế hoạch, báo cáo file đã thay đổi/test đã chạy/rủi ro còn lại. Tiếp tục triển khai các task tiếp theo theo kế hoạch. **Không public dữ liệu thật hoặc thay đổi DB production nếu chưa có thẩm quyền.**

## Lưu ý để tích hợp dữ liệu thật

`Schema.sql` chỉ mô tả cấu trúc một phần DB. Đội vận hành cần bổ sung thông tin xác thực về lưu trữ tệp (`ResourceID`, `DinhKem`), ý nghĩa các trường trạng thái/quyền (`DoMat`, `IsAll`, `State`, `allowDownload`, ...), phương thức SSO, chính sách duyệt và kết nối mạng tin cậy. Codex phải ghi rõ những điểm thiếu, **không tự đoán**.
