# Điểm cần xác minh trước tích hợp thật

Demo UI không bị chặn. Tích hợp production **BLOCKED — thiếu tài liệu và hạ tầng**, chưa triển khai.

| Hạng mục                  | Trạng thái | Cần bổ sung                                                                               |
| ------------------------- | ---------- | ----------------------------------------------------------------------------------------- |
| E-Gov source/API/code     | UNVERIFIED | Repo hoặc API contract, quyền truy cập và phiên bản hệ thống                              |
| SQL Server                | UNVERIFIED | Version/collation, kết nối test, data owner và policy                                     |
| Phân loại và trạng thái   | UNVERIFIED | Dictionary của DoMat, State, Status, IsAll, GuiKhoVB, allowDownload                       |
| ResourceID/DinhKem/LuuTru | UNVERIFIED | Resource schema, file service, signed URL, metadata và bản phát hành                      |
| HaUI SSO                  | UNVERIFIED | OIDC/SAML contract, issuer, claims, role mapping, session policy                          |
| Duyệt công khai           | UNVERIFIED | Phân vai, tách người đề xuất–duyệt, thời hạn, checklist đã được phê duyệt                 |
| PDF và công khai file     | UNVERIFIED | Quét virus, redaction thật, storage riêng, checksum và phiên bản                          |
| Vận hành                  | UNVERIFIED | Network zones, TLS/DNS, backup, retention, monitoring và revoke strategy                  |
| Guideline thương hiệu     | PARTIAL    | Logo đã tải từ nguồn chỉ định; màu theo master prompt; cần nghiệm thu guideline hiện hành |

Không có credentials hoặc thông tin nhạy cảm được ghi trong repo. Không chạy SQL, không tự điền các giá trị trạng thái thiếu, không đưa bất kỳ tệp nội bộ nào vào fixtures.
