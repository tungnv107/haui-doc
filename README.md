# Cổng văn bản HaUI — Demo giao diện

Bản demo chạy được để duyệt giao diện trước khi triển khai hệ thống thật. Dùng Next.js App Router, React, TypeScript strict, Be Vietnam Pro, Lucide và PDF.js. Không cần SQL Server hoặc SSO.

## Xem ngay

- Trang chủ: http://127.0.0.1:3000
- Tra cứu: http://127.0.0.1:3000/van-ban
- Chi tiết và PDF: http://127.0.0.1:3000/van-ban/demo-001
- Mô phỏng quản trị: http://127.0.0.1:3000/demo/quan-tri

Khởi chạy trong thư mục dự án với Node.js 22.13+ hoặc 24 LTS:

```powershell
npm ci
npm run dev
```

Mở `http://127.0.0.1:3000`. Server chỉ lắng nghe loopback. Nếu đã có server ở cổng 3000, dùng bản đang chạy hoặc dừng server đó trước.

## Triển khai Docker

Xem [hướng dẫn triển khai](docs/DEPLOYMENT.md) để chạy bản build trên server và nối Nginx Proxy Manager. Cấu hình hiện tại dùng port `3003`, hostname Docker `haui-doc` trên mạng `npm_proxy`. Đây vẫn là bản demo, không phải hệ thống xử lý văn bản thật.

Để xem bản build tối ưu, dừng server dev rồi chạy:

```powershell
npm run build
npm start
```

## Những gì có thể trải nghiệm

- Trang chủ theo nhận diện HaUI, logo SVG chính thức được lưu cục bộ, font tiếng Việt tự phục vụ.
- 24 văn bản giả lập thuộc 5 loại, 7 lĩnh vực, hai năm 2025–2026. Số liệu hiển thị tính trực tiếp từ fixtures.
- Tìm số ký hiệu/trích yếu có hoặc không dấu. Bộ lọc AND theo loại, lĩnh vực, đơn vị, năm, khoảng ngày; URL chia sẻ được; sắp xếp; 8 kết quả/trang.
- Bảng desktop, card mobile, chuyển dạng danh sách, trạng thái không có kết quả.
- Lưu văn bản bằng localStorage, xem danh sách đã lưu, sao chép liên kết, in metadata.
- 24 tệp PDF thật, mỗi tệp 2 trang, có watermark “BẢN DEMO”; chuyển trang, zoom, toàn màn hình. Tệp `demo-012` chỉ cho xem, download endpoint trả 403.
- Danh mục loại/lĩnh vực, hướng dẫn có FAQ, trang chính sách demo.
- Không gian quản trị mô phỏng: chọn ba vai trò, tạo đề xuất, chọn quyền tệp mặc định chưa tích, gửi duyệt, checklist 6 bước, từ chối có lý do, phê duyệt, xác nhận công khai, thu hồi có lý do và lịch sử. Trạng thái lưu trên trình duyệt.
- Responsive, menu mobile, skip link, focus, dialog bàn phím, loading/error và noindex cho demo.

## Thử quy trình quản trị

1. Vào `/demo/quan-tri`, chọn **Người thẩm định**.
2. Mở hồ sơ `298/KH-ĐHCN`, xem trước và tích đủ 6 xác nhận, chọn **Phê duyệt hồ sơ**.
3. Đóng hồ sơ, chuyển **Vai trò demo** sang **Người xuất bản**.
4. Mở hồ sơ vừa duyệt, chọn **Công khai mô phỏng**, xác nhận; sau đó thử **Thu hồi bản mẫu** với lý do.
5. Xem **Nhật ký thao tác**. Chọn **Biên tập viên** để thử tạo đề xuất mới.

Mô phỏng quản trị và 24 tài liệu trên cổng tra cứu là hai bộ dữ liệu riêng để việc thử nghiệm không làm mất bộ mẫu. Đây không phải cơ chế xác thực hoặc RBAC production. `/admin` thực trả 404, không có tài khoản/mật khẩu mẫu hoặc kết nối E-Gov.

## Kiểm tra

```powershell
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

E2E dùng Chrome đã cài trên máy (`channel: chrome`) và server tại cổng 3000; Playwright tự chạy dev nếu chưa có server. Có thể sửa `channel` trong `playwright.config.ts` nếu dùng trình duyệt khác. Trên Windows có sandbox chặn network/process hoặc rename tệp tạm, chạy các lệnh test từ terminal thông thường.

`artifacts/` chứa ảnh giao diện và báo cáo khả năng truy cập; kết quả HTML E2E ở `playwright-report/index.html`. Xem `docs/DEMO_ACCEPTANCE.md` để biết phạm vi kiểm chứng và giới hạn.

## Cấu trúc chính

| Thư mục                | Nội dung                                                                   |
| ---------------------- | -------------------------------------------------------------------------- |
| `src/app`              | Routes, layout, metadata, giao diện dự phòng và endpoint PDF mẫu           |
| `src/components`       | Trang chủ, tra cứu, chi tiết, PDF viewer, quản trị, shell và UI dùng chung |
| `src/lib/documents.ts` | 24 fixtures, normalization, tìm kiếm, lọc, sắp xếp                         |
| `src/lib/workflow.ts`  | State machine của bài thực hành quản trị                                   |
| `data/pdf`             | 24 PDF minh họa, không đặt trực tiếp trong public                          |
| `public/brand`         | Logo SVG chính thức giữ nguyên                                             |
| `tests`                | Unit và E2E                                                                |
| `docs`                 | Quyết định, mapping, gaps và nghiệm thu demo                               |

PDF đã có sẵn, không cần Python để chạy web. Nếu chỉnh fixtures và cần tạo lại PDF: chạy `node scripts/export-demo-data.mjs`, sau đó `python scripts/generate-demo-pdfs.py` với Python có `reportlab`; mặc định dùng Arial của Windows trong `C:/Windows/Fonts` (có thể cấu hình `DEMO_FONT_DIR`). Script chỉ nhúng font vào PDF, không sao chép bộ font hệ thống vào repo.

## Ranh giới trước triển khai thật

Chưa có publication database, API tìm kiếm phía server, kết nối E-Gov, SSO, RBAC phía server, audit bất biến, phiên bản tệp, quét virus, đồng bộ/thu hồi xuyên hệ thống hoặc cấu hình production. Bộ test demo **không** thay thế bộ security P0 trong master prompt. Không đưa tài liệu thật vào bộ fixtures.

Logo tham chiếu [asset HaUI chính thức](https://www.haui.edu.vn/dnn/web/haui/assets/images/logo-ngang.svg?v=1.2), đối chiếu [trang nhận diện thương hiệu](https://www.haui.edu.vn/vn/html/nhan-dien-thuong-hieu). Màu thiết kế theo tài liệu yêu cầu; chưa nghiệm thu toàn bộ guideline thương hiệu. Không thay đổi `Schema.sql`, không chạy migration. Chỉ push hoặc deploy khi được yêu cầu rõ.
