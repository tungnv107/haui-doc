# Mapping sơ bộ từ Schema.sql

Đã đọc toàn bộ file (31 CREATE TABLE). Không có dữ liệu mẫu, stored procedure, view hoặc khai báo FOREIGN KEY trong file. Quan hệ dưới đây là ứng viên từ tên cột, **chưa được xác nhận bằng khóa ngoại hoặc nghiệp vụ**. Không truy vấn DB trong bản demo.

| Nguồn             | Ứng viên metadata công khai                                                                        | Null và xác minh                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Eg_VB             | SoHieu → sign; TrichYeu → title; NgayKy → issuedAt sau xác minh; NguoiKy → signatory nếu được phép | Các cột đều nullable. Không lấy NgayTao thay ngày ban hành.                                                      |
| Eg_VB_LoaiVanBan  | ID / TenLoaiVanBan, ứng viên nối LoaiVanBan                                                        | ID int identity PK; tên nvarchar(150) NULL. Semantics UNVERIFIED.                                                |
| Eg_VB_LinhVuc     | ID / TenLinhVuc, ứng viên nối LinhVuc                                                              | Tên nvarchar(250) NULL. Semantics UNVERIFIED.                                                                    |
| GU_HaUIDocument   | Sign, Abstract, IssuedDate, EffectiveDate                                                          | ID int identity PK; Sign(150), Abstract(500), ngày kiểu date, tất cả nullable. Ngày hiệu lực tách ngày ban hành. |
| GU_DocumentTypes  | ID / Name, ứng viên nối TypeID                                                                     | Name(250) NULL; Priority, Type chưa dùng.                                                                        |
| GU_DocumentFields | ID / Name, ứng viên nối FieldID                                                                    | Name(250) NULL; Priority, Type chưa dùng.                                                                        |
| GU_Organizations  | ID / Name, ứng viên nối OrganizationID                                                             | Name(250) NULL; cần xác nhận là đơn vị ban hành, không tự đoán.                                                  |
| GU_DocumentStatus | ID / Name, ứng viên nối StatusID                                                                   | Name(150) NULL; không đồng nhất status nội bộ với publication status.                                            |
| Eg_VB_DuThao      | Chỉ khảo sát VanBanID, FilePDF, NgayKyBanHanh                                                      | Bản nháp không phải nguồn public mặc định. Không có FK xác nhận liên kết.                                        |

## Trường chưa rõ và loại khỏi public

- `Eg_VB.DinhKem` nvarchar(500), `LuuTru` nvarchar(250): UNVERIFIED format, storage, access control.
- `GU_HaUIDocument.ResourceID` int NULL: không có bảng tài nguyên tương ứng trong Schema.sql.
- `DoMat`, `TrangThai`, `Status`, `GuiKhoVB`, `allowDownload`, `IsAll`, `State`, `StatusID`: không có bằng chứng semantics. NULL không phải an toàn; không dùng làm tiêu chí public.
- `NoiGui` nvarchar(500) là ứng viên nơi gửi, không tự map sang cơ quan ban hành.
- `NguoiKy` trên Eg_VB là chuỗi; trên Eg_VB_DuThao là int. Không gộp hai dạng hoặc đoán danh tính.
- Không đưa Logs, Comment, NoiDungLanhDao, TransactionID, user IDs, người nhận, phân phối, giao việc, luồng xử lý lên client.
- Các bảng TheoDoi, QuaTrinhXuLy, DuThao_YKien, LanhDao, GiaoViec, PheDuyet, PhoCap, GU_HaUIDocumentUser được loại khỏi phạm vi công khai.

Hai nguồn Eg_VB và GU_HaUIDocument phải giữ SourceType/SourceID riêng trong tích hợp tương lai. Public ID phải phát sinh riêng trong publication service; các ID `demo-*` chỉ thuộc fixtures.
