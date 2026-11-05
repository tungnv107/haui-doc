# Quyết định cho bản demo — 05/11/2026

1. **Phạm vi**: yêu cầu mới nhất là xây dựng trước giao diện demo để xem thử. Thực hiện UI có tương tác và fixture, chưa triển khai toàn bộ master prompt production.
2. **Khởi tạo**: thư mục chỉ có bốn tài liệu, Schema.sql và zip; chưa có application code để tái sử dụng. Chọn Next.js 16.4.5/React 19.3.1 theo phiên bản stable lấy từ npm trong phiên thực hiện; Node 24.18.0 hiện hữu.
3. **Styling**: CSS thuần dùng token và component dùng chung, không thêm Tailwind/shadcn chỉ để bọc CSS. Brand blue #153C88, yellow #FFCC4E; nền trung tính; Be Vietnam Pro self-hosted qua @fontsource. Lucide icon cùng hệ thống nét. Tăng cỡ chữ phụ và kiểm tra contrast bằng axe.
4. **Thiết kế**: trang chủ ưu tiên tìm kiếm, nhịp chữ rõ, danh mục bằng icon; nền hero xanh nhạt và minh họa văn bản bằng HTML/CSS. Không dùng ảnh stock hoặc logo vẽ lại. Logo chính thức tải nguyên bản, không đổi màu hay tỷ lệ.
5. **Dữ liệu**: 24 metadata tự tạo, 24 PDF 2 trang, mọi màn hình/tệp ghi rõ demo. Tất cả chỉ số tính từ fixtures. Không lấy nội dung từ E-Gov hoặc thông tin cá nhân thật.
6. **Tra cứu**: lọc/sort/pagination phía client cho bộ nhỏ. Normalization NFD bỏ combining marks, đổi Đ/đ và lowercase; dấu câu giữ nguyên. Đây là tìm chuỗi con, không phải fuzzy/full-text engine. Production phải chuyển sang server và collation đã xác nhận.
7. **Quản trị**: `/demo/quan-tri` là bài thực hành công khai, không phải admin thực. Role switcher chỉ mô phỏng. Không tự chế mật khẩu/SSO; `/admin` trả 404. Audit và localStorage có thể bị sửa, không có giá trị bảo mật.
8. **Tệp**: PDF ở ngoài public, endpoint chọn ID từ allowlist fixture, chỉ chấp nhận mode preview/download, chặn download cho tệp chỉ xem và trả no-store. Byte preview vẫn có thể lưu được; không quảng cáo chống tải tuyệt đối. PDF.js worker self-hosted cùng phiên bản dependency.
9. **Môi trường**: chạy local loopback, toàn website noindex; không deploy/push. Không dùng skill sites hoặc visualize.
10. **Tích hợp**: chưa cung cấp tài liệu SSO, nguồn file, credentials hoặc business semantics; đánh dấu UNVERIFIED, không suy luận từ schema.
11. **Bản build**: build tối ưu chỉ chứng minh mã compile được, không biến demo thành hệ thống production an toàn. Việc dùng mock UI trong production cần bị loại bỏ khi triển khai nền tảng thật.
