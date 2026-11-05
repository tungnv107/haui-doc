# Báo cáo kiểm chứng bản demo

Ngày thực hiện: **05/11/2026**, múi giờ Asia/Ho_Chi_Minh. Môi trường Windows, Node.js 24.18.0, Chrome headless thật; ứng dụng tại `http://127.0.0.1:3000`.

## Kết quả

| Kiểm tra               | Kết quả thực tế                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`    | PASS; tạo lại types route trước tsc strict                                                                                |
| `npm run lint`         | PASS, không còn lỗi/cảnh báo ESLint                                                                                       |
| `npm test`             | **17/17 PASS**, 2 test files                                                                                              |
| `npm run test:e2e`     | **11/11 PASS**, Chrome, 2 workers, khoảng 31 giây                                                                         |
| `npm run build`        | PASS; tất cả trang/route build thành công                                                                                 |
| PDF                    | **24 tệp / 48 trang**; pypdf xác nhận đủ 2 trang mỗi tệp, trích xuất được Unicode và nhãn demo                            |
| Render PDF             | Poppler render hai trang demo-001; đã xem ảnh xác nhận bố cục, chữ Việt, bảng phụ lục, watermark, footer và đánh số trang |
| Axe automated audit    | **0 violations** với wcag2a/wcag2aa/wcag21aa trên 8 màn hình/trạng thái; báo cáo JSON đính kèm trong repo                 |
| Browser runtime        | Không có pageerror trong lượt chụp kiểm chứng cuối                                                                        |
| Responsive             | Không tràn ngang ở **320, 375, 768, 1024, 1440 px**, 6 route chính mỗi kích thước                                         |
| Kiểm tra ảnh trực tiếp | Trang chủ desktop/mobile, tra cứu desktop, chi tiết PDF, quản trị desktop, PDF hai trang                                  |

## 11 ca E2E

1. Trang chủ, logo, tìm không dấu, lọc loại và giữ bộ lọc sau reload.
2. Phân trang, sắp xếp, chọn nhanh nhiều bộ lọc AND, empty state và xóa bộ lọc.
3. Lưu/bỏ lưu, localStorage giữ dữ liệu sau reload.
4. Render PDF thật, chuyển trang 1→2, zoom 125%, download đúng tên có dấu.
5. Tệp chỉ xem: preview 200, download 403; ID/mode sai 404; `/admin` 404; UI không có link download.
6. Chuỗi script được xử lý như dữ liệu, robots/meta/header noindex.
7. Checklist thiếu chặn duyệt, phê duyệt → công khai có xác nhận → thu hồi có lý do; audit và lưu trạng thái.
8. Biên tập viên tạo nháp, quyền tệp mặc định chưa chọn, gửi thẩm định; không có thao tác tự duyệt.
9. 30 tổ hợp route/kích thước, không tràn viewport.
10. Skip link qua bàn phím, menu mobile, đóng dialog bằng Escape và khôi phục trạng thái menu.
11. Axe trên public pages, entry quản trị, dashboard và dialog thẩm định.

## Các lỗi đã phát hiện và sửa

- Màu chữ phụ và một số badge chưa đạt contrast: tăng độ đậm, đồng thời tăng cỡ chữ dễ đọc.
- Tên truy cập bộ lọc bị ghép với nội dung option: thêm aria-label rõ ràng.
- Chọn hai bộ lọc nhanh có thể mất bộ lọc trước do navigation bất đồng bộ: dùng Native History API, luôn kết hợp từ URL mới nhất; giữ Back/Forward và URL chia sẻ được.
- Vùng PDF cuộn thiếu truy cập bàn phím: bổ sung region label, tabIndex và focus indicator.
- `notFound()` trong route streaming có thể trả 200: `/admin` được thay bằng route trả 404 rõ ràng.
- Typecheck đọc stale route types sau đổi file convention: chạy `next typegen` trước tsc.

## Bằng chứng trong repo

- `artifacts/home-desktop.png`, `home-320.png`, `home-375.png`, `home-768.png`, `home-1024.png`.
- `artifacts/search-desktop.png`, `search-320.png`, `search-375.png`, `search-768.png`, `search-1024.png`.
- `artifacts/detail-desktop.png`, `admin-desktop.png`, `admin-review.png`, `admin-mobile.png`.
- `artifacts/accessibility-final.json`: 8 màn hình/trạng thái, không có violations hoặc pageerror.
- `artifacts/pdf/demo-001-1.png`, `demo-001-2.png`: PDF render bằng Poppler.
- `playwright-report/index.html`: báo cáo E2E sinh từ lượt kiểm thử cuối.

## Giới hạn nghiệm thu

- Đây là kết quả **demo UI**, không phải chứng nhận WCAG đầy đủ hay nghiệm thu security P0 production. Chưa kiểm thử Safari/Firefox, screen reader thật, mạng yếu hoặc thiết bị di động vật lý.
- PDF canvas có nhãn truy cập, chưa có text layer tương tác đầy đủ; tệp PDF chứa text Unicode.
- Tìm kiếm/paging client; quản trị và audit localStorage; không SSO/SQL Server/publication backend, chưa có concurrency/version/revoke-cache guarantee.
- Form quản trị không upload tệp thật; preview quản trị là tóm tắt giả lập. Các thao tác công khai không thay đổi 24 fixtures public và không ghi dữ liệu ra hệ thống ngoài.
- Bộ test hiện tại không thay thế các tiêu chí production trong tài liệu master prompt. Không có deploy, push, migration hoặc kết nối dữ liệu thật trong phiên này.

**Sẵn sàng để chủ dự án xem và góp ý giao diện.**
