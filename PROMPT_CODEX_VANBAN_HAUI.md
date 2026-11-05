# MASTER PROMPT CHO CODEX — CỔNG CÔNG KHAI VĂN BẢN HaUI

**Dự án:** vanban.haui.edu.vn  
**Tên sản phẩm:** Cổng thông tin văn bản công khai — Đại học Công nghiệp Hà Nội  
**Nguồn dữ liệu:** Hệ thống E-Gov / quản lý văn bản hiện hữu (`HauiEgov`, Microsoft SQL Server)  
**Đầu vào bắt buộc:** `Schema.sql` do chủ dự án cung cấp; mã nguồn hiện hữu (nếu có); tài liệu tích hợp/xác thực/tệp (nếu có).  
**Tài liệu triển khai đi kèm:** `IMPLEMENTATION_PLAN_VANBAN_HAUI.md`.

---

## 0. Vai trò và chỉ thị vận hành

Bạn là **Principal Software Architect + Senior Full-stack Engineer + UI/UX Designer + Application Security Engineer + QA/DevOps Engineer**. Hãy **trực tiếp triển khai sản phẩm chạy được**, không chỉ viết phương án, không dừng ở mockup hoặc giao diện tĩnh.

1. Trước khi viết mã, **đọc toàn bộ mã nguồn và `Schema.sql`**; xác minh framework, phiên bản, cấu hình môi trường, cấu trúc dự án, cơ chế đăng nhập, DB và quản lý file. Nếu repo có sẵn, **tuân thủ kiến trúc hiện hữu**, ưu tiên tái sử dụng component, API, SSO, build/deploy, không tạo framework thứ hai.
2. **Không đoán** ý nghĩa các trạng thái nội bộ, quyền truy cập, trường mã hóa, đường dẫn file hay quan hệ ngoài Schema. Đối chiếu với code, stored procedure, API và dữ liệu mẫu đã được ẩn danh. Với chỗ chưa xác minh, ghi rõ `UNVERIFIED`, để tính năng rủi ro ở chế độ **mặc định không công khai**.
3. Nếu chỉ có Schema mà chưa có kết nối E-Gov, tiếp tục xây dựng web và module công khai hoàn chỉnh bằng **fixtures/test doubles được đánh dấu rõ**, adapter chưa kết nối phải trả lỗi cấu hình có kiểm soát; **không giả vờ đã tích hợp dữ liệu thật**.
4. Mỗi task: code → kiểm tra tĩnh → unit/integration test → cập nhật checkbox kế hoạch → báo cáo thay đổi. Không đánh dấu hoàn thành khi chưa có bằng chứng test.
5. Không cần hỏi lại các quyết định đã xác lập trong tài liệu này. Với lựa chọn chưa biết nhưng không rủi ro, chọn mặc định hợp lý và ghi vào `docs/DECISIONS.md`. **Không thực hiện thay đổi phá hủy DB/production hay công bố dữ liệu thật nếu chưa có phê duyệt phù hợp.**
6. Mục tiêu ưu tiên: **Bảo mật và cơ chế phê duyệt công khai > đúng dữ liệu > trải nghiệm tra cứu > tối ưu và tính năng bổ sung**.

## 1. Mục tiêu và ranh giới nghiệp vụ

Xây dựng website **https://vanban.haui.edu.vn** phục vụ công chúng, người học, viên chức và các tổ chức tra cứu **những văn bản được Đại học Công nghiệp Hà Nội chủ động duyệt và xuất bản công khai**. Trang công khai không bắt buộc đăng nhập.

**Phân biệt rõ hai hệ thống:**

- **E-Gov / Quản lý văn bản gốc**: nơi tạo, tiếp nhận, xử lý, ký số, lưu trữ và phân quyền nghiệp vụ văn bản. Đây là nguồn nội bộ, KHÔNG tự động là nguồn public.
- **Cổng công khai**: chỉ tiếp nhận các bản ghi/tệp **đã được duyệt xuất bản cho Internet**, cung cấp tra cứu, chi tiết, xem PDF, tải tệp nếu được cho phép, metadata chia sẻ và các tiện ích tìm kiếm. Không thay thế quy trình văn thư và không được hiển thị dữ liệu xử lý nội bộ.

**Nguyên tắc bất biến:** *Có quyền đọc trong E-Gov ≠ được công khai ra Internet; văn bản đã ký ≠ được công khai; `allowDownload` ≠ công khai; `IsAll` ≠ công khai Internet cho tới khi kiểm chứng ngữ nghĩa.*

## 2. Phân tích Schema.sql và ánh xạ dữ liệu cần thực hiện

Cơ sở dữ liệu trong tệp là `[HauiEgov]`, dùng SQL Server. Những bảng có thật (theo Schema đầu vào):

| Nguồn | Bảng | Trường có giá trị cho cổng công khai | Yêu cầu |
|---|---|---|---|
| Văn bản đến/đi | `dbo.Eg_VB` | `ID`, `SoHieu`, `TrichYeu`, `LoaiVanBan`, `LinhVuc`, `NgayKy`, `NguoiKy`, `NoiGui`, `NgayTao`, `DinhKem`, `LuuTru`, `IsDen`, `DoMat`, `allowDownload`, `TrangThai`, `Status`, `GuiKhoVB` | Chỉ dùng sau khi xác minh ý nghĩa và quyết định công khai độc lập. |
| Loại văn bản E-Gov | `dbo.Eg_VB_LoaiVanBan` | `ID`, `TenLoaiVanBan` | Join theo `Eg_VB.LoaiVanBan`, sau khi kiểm chứng dữ liệu. |
| Lĩnh vực E-Gov | `dbo.Eg_VB_LinhVuc` | `ID`, `TenLinhVuc` | Join theo `Eg_VB.LinhVuc`. |
| Kho văn bản | `dbo.GU_HaUIDocument` | `ID`, `Sign`, `Abstract`, `IssuedDate`, `EffectiveDate`, `OrganizationID`, `TypeID`, `FieldID`, `ResourceID`, `StatusID`, `IsAll`, `State` | **Ứng viên nguồn dữ liệu public quan trọng**, nhưng vẫn cần duyệt công khai rõ ràng. |
| Danh mục kho | `dbo.GU_DocumentTypes` | `ID`, `Name`, `Priority`, `Type` | Mapping `TypeID`. |
| Danh mục lĩnh vực kho | `dbo.GU_DocumentFields` | `ID`, `Name`, `Priority`, `Type` | Mapping `FieldID`. |
| Đơn vị ban hành | `dbo.GU_Organizations` | `ID`, `Name`, `Priority`, `Type` | Mapping `OrganizationID`; kiểm tra semantics. |
| Trạng thái kho | `dbo.GU_DocumentStatus` | `ID`, `Name` | Chỉ hiển thị/áp dụng đúng khi xác minh ý nghĩa. |
| Dự thảo | `dbo.Eg_VB_DuThao` | `ID`, `SoHieu`, `TrichYeu`, `FilePDF`, `VanBanID`, `TrangThaiID`, `NgayKyBanHanh` | **Không xuất bản dự thảo mặc định**; chỉ cân nhắc bản phát hành chính thức có xác minh nối sang văn bản gốc. |

**KHÔNG đưa ra public hoặc public API các bảng/nhóm trường nội bộ:** `Eg_VB_TheoDoi`, `Eg_VB_QuaTrinhXuLy`, `Eg_VB_DuThao_YKien`, `Eg_VB_DuThao_TheoDoi`, `Eg_VB_LanhDao`, `Eg_Vb_GiaoViec`, `Eg_Vb_PheDuyet`, `Eg_Vb_PhoCap`, `GU_HaUIDocumentUser`, và các trường `Logs`, `Comment`, `NoiDungLanhDao`, người nhận/phân phối, user ID, workflow, ghi chú nội bộ, TransactionID, v.v.

**Đặc biệt phải khảo sát:**

- `GU_HaUIDocument.ResourceID` trỏ tới kho file/bảng tài nguyên nào? Schema hiện tại **không có định nghĩa bảng tài nguyên**.
- `Eg_VB.DinhKem` là đường dẫn, danh sách đường dẫn hay ID tham chiếu? `Eg_VB.LuuTru` mang ý nghĩa gì?
- Các giá trị `DoMat`, `IsAll`, `State`, `StatusID`, `TrangThai`, `Status`, `GuiKhoVB`, `allowDownload` được định nghĩa trong code/stored procedure ra sao?
- `Eg_VB.NoiGui` là nơi gửi, **không mặc nhiên được coi là cơ quan ban hành**. Trường mã đơn vị chưa có bảng liên kết trong Schema thì không đoán tên.
- `Eg_VB.NgayKy` có thể dùng làm ngày ký/ban hành **khi nghiệp vụ xác nhận**; không thay bằng ngày tạo. `GU_HaUIDocument.IssuedDate` và `.EffectiveDate` là hai khái niệm khác nhau.
- Không cố ép dữ liệu hai nguồn vào một phép join khi chưa chứng minh có khóa liên kết; hỗ trợ `SourceType` + `SourceID` minh bạch.

**Tạo tài liệu sau khảo sát:** `docs/DATABASE_MAPPING.md` (bảng nguồn → trường public, ràng buộc, khả năng null, semantics, bảng chưa biết) và `docs/SOURCE_GAPS.md` (điểm cần đội E-Gov xác nhận). Không dùng chuỗi SQL động nối input người dùng.

## 3. Kiến trúc khuyến nghị

Ưu tiên **public portal độc lập**, kết nối với E-Gov bằng dịch vụ xuất bản kiểm soát trong mạng tin cậy. Kiến trúc mục tiêu:

```text
                      MẠNG NỘI BỘ HaUI
┌─────────────────────────────────────────────────────────────┐
│ E-Gov / Quy trình xử lý văn bản                             │
│   Eg_VB, GU_HaUIDocument, tài nguyên file, SSO/nhân sự      │
│             │                                               │
│             ▼                                               │
│  Module Publication Admin (SSO + RBAC + duyệt + audit)      │
│             │  explicit approval + validated safe snapshot  │
│             ▼                                               │
│  Publication Service / transactional outbox / secure sync   │
└─────────────┼───────────────────────────────────────────────┘
              │ kênh có xác thực + allowlist/IP/mTLS tùy hạ tầng
              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PUBLIC ZONE                               │
│  Publication DB (metadata đã duyệt + snapshot public)       │
│  Approved File Storage (bản tệp đã phê duyệt riêng)         │
│  Public API (allowlist trường) + search index               │
│  Next.js public portal  → https://vanban.haui.edu.vn         │
└─────────────────────────────────────────────────────────────┘
```

- Không để frontend/browser có quyền kết nối database gốc, thư mục tài liệu nội bộ hoặc khóa service của E-Gov.
- Nếu hệ thống hiện hữu đã có API publication an toàn, **tái sử dụng** và chỉ tạo lớp adapter. Nếu chưa có, làm module publication phụ trợ bằng bảng/dịch vụ riêng; thay đổi cơ sở dữ liệu chỉ theo dạng migration **additive**, có backup/rollback.
- Nên dùng **snapshot metadata và bản sao tệp được duyệt** để tránh vô tình phản ánh nội dung nội bộ thay đổi sau khi đã xuất bản. Khi nguồn gốc bị rút/quyền truy cập thay đổi/đánh dấu hạn chế: chặn ngay, đồng bộ thu hồi và audit.
- Trang public phải chỉ đọc bảng/snapshot công khai; định danh public khác ID nội bộ (UUID/ULID hoặc mã opaque).
- Tại runtime, mỗi yêu cầu chi tiết/file phải kiểm tra `publication_status = PUBLISHED`, `published_at <= now`, `revoked_at IS NULL`, và `expires_at IS NULL OR expires_at > now` **tại server**. Không dựa duy nhất vào UI, cron, chỉ số tìm kiếm hay cache.
- Thiết kế cho khả năng tách môi trường `development`, `staging`, `production`; tuyệt đối không dùng dữ liệu thật không được duyệt trong demo/staging.

## 4. Quy trình công khai bắt buộc

Thiết kế RBAC có ít nhất:

- `PUBLIC_VISITOR`: tra cứu/xem các nội dung thực sự public, không cần tài khoản.
- `PUBLICATION_EDITOR`: đề xuất tài liệu/tệp và chỉnh sửa metadata công khai, không có quyền xuất bản.
- `PUBLICATION_REVIEWER`: thẩm định nội dung, tệp, độ mật, dữ liệu cá nhân; duyệt/từ chối theo quyền.
- `PUBLICATION_PUBLISHER` hoặc `ADMIN`: phát hành, gỡ bỏ, thu hồi; admin cấu hình hệ thống. Tách vai trò hai người đề xuất–duyệt nếu tổ chức áp dụng.
- `AUDITOR`: đọc nhật ký được phân quyền, không sửa/xóa audit.

Luồng trạng thái chuẩn:

```text
DRAFT → PENDING_REVIEW → APPROVED → PUBLISHED
                     ↘ REJECTED → DRAFT
PUBLISHED → REVOKED
PUBLISHED → EXPIRED (theo điều kiện thời hạn)
```

Các hành động phải kiểm soát permission và được ghi log: tạo đề xuất, thay đổi metadata, chọn tệp sẽ công khai, gửi duyệt, duyệt/từ chối + lý do, xuất bản, đặt lịch, thay thế phiên bản, thu hồi và xuất bản lại theo lần duyệt mới. **Cập nhật metadata/tệp sau duyệt phải làm mất hiệu lực phê duyệt cũ** trừ trường được quy định rõ, và bắt buộc phê duyệt lại.

Checklist trước xuất bản, mặc định **không chọn**:

1. Xác nhận văn bản được phép công khai và đã ban hành hợp lệ.
2. Xác minh không thuộc danh mục bí mật nhà nước, thông tin nội bộ bị hạn chế hoặc thuộc diện không được công khai; **`DoMat = NULL` không phải bằng chứng an toàn**.
3. Kiểm tra thông tin cá nhân, dữ liệu nhạy cảm, chữ ký, con dấu, các phụ lục; khi cần phải tạo **bản dành riêng cho công khai và che/xóa dữ liệu thực sự ở tầng file**, không phủ lớp màu có thể bỏ đi.
4. Chọn rõ **từng file** được xem công khai và **từng file** được phép tải. Không mở toàn bộ file đi kèm theo mặc định.
5. Preview chính xác những gì một khách truy cập ẩn danh sẽ thấy, kể cả nội dung nhúng, bản xem trước và file tải.
6. Duyệt bởi người có thẩm quyền; ghi người duyệt, thời điểm, phiên bản, lý do, dấu vết kiểm duyệt.

Không xuất bản tự động toàn bộ dữ liệu hiện hữu. Tính năng import hàng loạt chỉ đưa vào **hàng chờ rà soát**, không tự `PUBLISHED`.

## 5. Cơ sở dữ liệu publication — đề xuất thiết kế bổ sung

Tạo migration SQL Server tương thích phiên bản DB hiện hữu; không sửa cấu trúc/đổi tên bảng nội bộ khi chưa phê duyệt. Tên đề xuất (được phép điều chỉnh theo convention repo):

**`dbo.PUB_Documents`**
- `PublicID` (uniqueidentifier/ULID tương đương, khóa public opaque), `SourceType` (`EG_VB`/`GU_DOCUMENT`), `SourceID` (int), optional `SourceVersion`.
- `Sign`, `Abstract`, `DocumentTypeName`, `FieldName`, `OrganizationName`, `IssuedDate`, `EffectiveDate`, `Signatory` (nullable), `CanonicalSlug`, `LanguageCode`.
- `PublicationStatus`, `IsFeatured`, `IsDownloadAllowed` (nếu cần chính sách ở mức văn bản), `ApprovedBy`, `ApprovedAt`, `PublishedBy`, `PublishedAt`, `ExpiresAt`, `RevokedBy`, `RevokedAt`, `RevocationReason`.
- `CreatedAt`, `CreatedBy`, `UpdatedAt`, `UpdatedBy`, `RowVersion` (`rowversion`) và `SnapshotHash` hoặc `ContentVersion`.
- Unique key trên `(SourceType, SourceID)` nếu nghiệp vụ yêu cầu mỗi tài liệu chỉ có một publication hiện hành; các lần cập nhật theo `version` riêng; chống double-publish/race condition.

**`dbo.PUB_DocumentFiles`**
- ID riêng, `PublicDocumentID`, `SafeFileKey` (khóa object storage, không phải filesystem path client), `OriginalName` đã chuẩn hóa, `MimeType`, `Extension`, `SizeBytes`, `Sha256`, `SortOrder`, `AllowPreview`, `AllowDownload`, `ScanStatus`, `PublicationVersion`, `ApprovedAt`.
- Chỉ tồn tại tệp **đã sao chép/kiểm tra** vào vùng public-approved; object storage private-by-default.

**`dbo.PUB_DocumentVersions`**
- Snapshot bất biến cho từng lần đề xuất/phê duyệt/phát hành: metadata/tệp/hash/phiên bản/thời điểm; hỗ trợ rollback có kiểm soát và audit.

**`dbo.PUB_AuditLogs`**
- `AuditID`, `ActorID`, `Action`, `PublicDocumentID`, `Before/After` được loại bỏ secret/PII không cần thiết, `Reason`, `Timestamp`, `RequestID`, `ClientIP/UserAgent` theo chính sách lưu giữ; ghi append-only, không cho editor xóa.

**`dbo.PUB_Settings`** (khi thực sự cần) và **transactional outbox** (khi cần đồng bộ khác zone).

Yêu cầu: indexes theo trạng thái + thời gian công khai, số ký hiệu/trích yếu đã chuẩn hóa, loại/lĩnh vực/năm; full-text index chỉ nếu hạ tầng SQL Server hỗ trợ và được kiểm chứng. Tạo migration `up/down`, transaction khi có thể, rollback strategy và script seed **demo không chứa tài liệu nội bộ**. Chính sách thời hạn lưu/thu hồi phải cấu hình và được phê duyệt.

## 6. Thiết kế thương hiệu — bắt buộc bám HaUI

**Logo chính thức mà chủ dự án cung cấp:**

`https://www.haui.edu.vn/dnn/web/haui/assets/images/logo-ngang.svg?v=1.2`

**Bộ nhận diện thương hiệu HaUI chính thức:**

- Trang: `https://www.haui.edu.vn/vn/html/nhan-dien-thuong-hieu`
- Tài liệu: `https://www.haui.edu.vn/media/He%CC%A3%CC%82%20tho%CC%82%CC%81ng%20nha%CC%A3%CC%82n%20die%CC%A3%CC%82n%20HaUI.pdf`
- Màu chủ đạo **HaUI Dark Blue**: `#153C88`.
- Màu vàng thương hiệu: `#FFCC4E`; vàng phụ: `#FDBA4D`.
- Đỏ thương hiệu: `#DE2938` (chỉ làm điểm nhấn/feedback quan trọng, tránh lạm dụng).
- Màu chữ tối: `#231F20`; trắng `#FFFFFF`; nền trung tính đề xuất `#F7F9FC`, border `#E3EAF3` (2 màu sau là UI neutrals, **không nhận là màu thương hiệu**).
- **Be Vietnam Pro** cho heading/menu/CTA; **Roboto** hoặc Be Vietnam Pro cho nội dung dài; tải font đúng giấy phép, có fallback, tối ưu subset tiếng Việt.
- Xác minh lại màu và quy tắc dùng logo từ phiên bản guideline hiệu lực khi triển khai. Không tô màu lại logo SVG, không kéo méo, không tự ý thêm hiệu ứng, giữ khoảng trống an toàn. Tải bản logo chính thức về asset nội bộ **nếu được phép**, có fallback không gián đoạn khi website nguồn lỗi.

**Design tokens gợi ý:**

```css
:root {
  --haui-blue: #153C88;
  --haui-yellow: #FFCC4E;
  --haui-yellow-2: #FDBA4D;
  --haui-red: #DE2938;
  --haui-ink: #231F20;
  --surface: #FFFFFF;
  --canvas: #F7F9FC;
  --border: #E3EAF3;
  --radius-card: 14px;
}
```

**Định hướng UI:** website cơ quan/đại học, **chính thống – trang nhã – hiện đại – dễ tra cứu**, không dùng visual phong cách crypto/fintech/game hay gradient quá mạnh. Header trắng và logo ngang, thanh xanh thương hiệu vừa phải, nhấn vàng tinh tế, typography đậm nét đúng guideline, card rõ ràng, spacing thoáng, shadow nhẹ. Không dùng stock ảnh đại diện văn bản để lấp chỗ trống; ưu tiên thiết kế thiên về dữ liệu và tra cứu.

## 7. Trang, layout và tương tác cần hoàn thành

### 7.1 Header / footer / accessibility

- Header desktop: logo HaUI bên trái + nhãn **CỔNG THÔNG TIN VĂN BẢN CÔNG KHAI**; điều hướng `Trang chủ`, `Tra cứu văn bản`, `Loại văn bản`, `Lĩnh vực`, `Hướng dẫn` (nếu có nội dung thật); shortcut `haui.edu.vn`.
- Mobile: logo không bị bóp méo, menu hamburger/drawer, ưu tiên thanh tìm kiếm; **không để menu dàn hàng ngang gây tràn**.
- Footer: tên trường `Đại học Công nghiệp Hà Nội`, địa chỉ/điện thoại/email chỉ lấy từ trang liên hệ chính thức hiện hành, link website chính, chính sách thông tin, điều khoản sử dụng, hướng dẫn liên hệ gỡ/sửa văn bản.
- Breadcrumb; skip-to-content; tab navigation; focus visible; label; alt logo; contrast WCAG 2.2 AA; responsive ở 320/375/768/1024/1440 px; nút/touch target đủ lớn.

### 7.2 Trang chủ `/`

- Hero gọn, nền xanh HaUI, tiêu đề: **TRA CỨU VĂN BẢN CÔNG KHAI** và mô tả ngắn.
- **Thanh tìm kiếm lớn**: placeholder `Nhập số, ký hiệu hoặc trích yếu văn bản...`, nút `Tìm kiếm` màu vàng.
- Quick filters: loại văn bản, lĩnh vực, năm ban hành, đơn vị ban hành; chỉ xuất hiện nếu có dữ liệu khả dụng.
- `Văn bản mới công khai` (danh sách mới nhất theo `PublishedAt`); `Danh mục tra cứu`; `Văn bản nổi bật` chỉ nếu admin đánh dấu thật.
- Chỉ số như `Tổng số văn bản công khai` nếu tính từ DB thực tế; **không dùng số liệu giả**.
- Empty, error, loading skeleton chuẩn; không hiện raw JSON/stack trace.

### 7.3 Trang danh sách `/van-ban`

- Search query `q` và bộ lọc URL: `loai`, `linh-vuc`, `don-vi`, `nam`, `tu-ngay`, `den-ngay`, `trang`, `sap-xep`.
- Hiển thị dạng **bảng trên desktop + card trên mobile**. Cột: `Số ký hiệu`, `Trích yếu`, `Loại`, `Ngày ban hành`, `Đơn vị ban hành` (nếu có), action xem.
- Search không phân biệt hoa/thường; hỗ trợ tiếng Việt có dấu/không dấu khi triển khai được chính xác; giải thích chiến lược normalization để không nhầm kết quả.
- Filter kết hợp AND; phân trang phía server; sắp theo `PublishedAt`/`IssuedDate`, deterministic tie-breaker; URL có thể chia sẻ và nút xóa bộ lọc.
- Giới hạn độ dài `q`, giới hạn page size, chống query nặng/SQL injection; không cho tìm kiếm theo ID nội bộ hay trường nội bộ.

### 7.4 Trang chi tiết `/van-ban/[slug]-[publicId]` hoặc URL tương đương

- Breadcrumb; tiêu đề trích yếu; nhãn loại văn bản; số/ký hiệu rõ ràng.
- Thông tin chính: `Số, ký hiệu`, `Ngày ban hành`, `Ngày hiệu lực` (nếu có), `Loại văn bản`, `Lĩnh vực`, `Đơn vị/cơ quan ban hành` (đúng semantics), `Người ký` (nếu xác minh và được phép), `Ngày công khai`.
- Nội dung tệp công khai dạng **PDF viewer responsive**, toolbar trang/zoom/toàn màn hình, fallback `Mở tệp` hoặc `Tải xuống` khi chính sách cho phép. Chỉ viewer tệp đã được duyệt; không embed URL nội bộ; không dùng public CDN không kiểm soát.
- Tệp đính kèm hiển thị theo danh sách tên/loại/kích thước/được tải hay không. **Không xuất hiện link download khi bị cấm**, đồng thời backend cũng phải từ chối tải.
- Tính năng `Sao chép liên kết`, in trang metadata, chia sẻ, `Văn bản liên quan` chỉ dựa dữ liệu public và quan hệ thật; không bắt buộc nếu chưa có mapping.
- Khi revoked/expired/not published, trả **404 hoặc 410** theo chính sách, không tiết lộ trích yếu/file/tên nguồn nội bộ trong response.

### 7.5 Trang quản trị xuất bản `/admin` (hoặc tách nội bộ)

**Tuyệt đối không cho truy cập admin ẩn danh**. Tái dùng HaUI SSO hoặc cơ chế danh tính hiện hữu đã được kiểm chứng; không tự chế tài khoản mật khẩu công khai. Admin UI có:

1. Dashboard: số hồ sơ chờ duyệt, đã công khai, bị thu hồi; dữ liệu từ DB.
2. Danh sách nguồn E-Gov đủ quyền để nhân viên đề xuất, có lọc theo nhóm; **không mở API enumerate toàn E-Gov cho public**.
3. Form đề xuất: chọn nguồn, metadata public, tệp **được phép** công khai, trạng thái, thời hạn, lựa chọn preview/download, ghi chú kiểm duyệt.
4. Preview **giống hệt giao diện public ở chế độ ẩn danh**, có watermark nhắc `BẢN XEM TRƯỚC — CHƯA CÔNG KHAI` (chỉ trong admin).
5. Màn duyệt: checklist, hiển thị diff giữa bản gốc được phép xem và bản public, phê duyệt/từ chối có lý do.
6. Xuất bản, đặt lịch (nếu triển khai), thu hồi, thay thế bản công khai; confirm thao tác nguy hiểm.
7. Audit timeline + lọc; role-based visibility; cảnh báo tệp lỗi/quét malware/chưa có bản công khai.
8. Các action nhạy cảm yêu cầu CSRF protection, RBAC ở backend, phiên đăng nhập an toàn, session timeout, audit.

## 8. API/contract tối thiểu

Ưu tiên thiết kế OpenAPI hoặc route handler có schema validation (ví dụ Zod). API public không nhận `SourceID` làm quyền truy vấn file.

**Public read-only** (đường dẫn chỉ là đề xuất):

```http
GET /api/public/documents?q=&type=&field=&organization=&year=&from=&to=&page=&pageSize=&sort=
GET /api/public/documents/{publicId}
GET /api/public/documents/{publicId}/files/{fileId}/preview
GET /api/public/documents/{publicId}/files/{fileId}/download
GET /api/public/facets
GET /api/public/health
```

**Admin (authenticated, authorized):**

```http
GET  /api/admin/publications
POST /api/admin/publications
PATCH /api/admin/publications/{id}
POST /api/admin/publications/{id}/submit
POST /api/admin/publications/{id}/approve
POST /api/admin/publications/{id}/reject
POST /api/admin/publications/{id}/publish
POST /api/admin/publications/{id}/revoke
GET  /api/admin/publications/{id}/audit
```

- DTO public **allowlist** chỉ gồm: publicId, slug, sign, abstract, type, field, issuer, issued/effective/published date, approved public files. Không `SELECT *` trực tiếp serialize DB row.
- Admin endpoints có access control ở server (role + resource scope), validation, 401/403/404/409 rõ, idempotency cho publish, optimistic locking/transactions; pagination/rate limit.
- Preview/download: check toàn bộ publication + file permission khi **mỗi yêu cầu**; Content-Type đúng, `X-Content-Type-Options: nosniff`, `Content-Disposition` an toàn, chống path traversal, URL nội bộ/file storage không lộ.
- Search không tìm/suy ra các bản ghi chưa được duyệt qua count/facets/autocomplete/sitemap/OG/API.
- Error model nhất quán `{code,message,requestId}`; log server không in chuỗi kết nối, token, nội dung tệp bí mật.

## 9. Xử lý tệp, an toàn dữ liệu và pháp lý

- Quyền truy cập **deny by default**; ID public không phải chứng thực quyền. Không để nguồn E-Gov truy cập trực tiếp từ Internet.
- Tệp chỉ public sau bước validate thực tế: kiểm tra loại tệp theo signature/MIME, kích thước, virus/malware (khi có engine), kiểm duyệt dữ liệu nhạy cảm, chuyển sang định dạng an toàn khi cần; lưu hash SHA-256, file metadata và nguồn/phiên bản.
- Prefer bản PDF đã phát hành chính thức cho viewer. DOCX/XLSX nếu cần preview: chuyển đổi ở worker cô lập và chỉ dùng output đã kiểm tra; không thực thi macro, không render HTML/JS không tin cậy.
- Nếu chuyển PDF để che thông tin: redaction phải **xóa dữ liệu gốc** kể cả hidden text, OCR layer, annotation, attachment, metadata, thumbnail; có test extraction sau redaction.
- Không sử dụng `allowDownload`, tên file, `ResourceID`, `DinhKem` như bằng chứng là file được public.
- Nếu cần signed URL, TTL ngắn và scope chính xác; cần cách **vô hiệu ngay** khi thu hồi. Tránh cache public cho file có khả năng thu hồi hoặc cấu hình cực ngắn + purge có thể kiểm chứng. Thêm `X-Robots-Tag: noindex` cho nội dung không nên index.
- Check SSRF khi lấy file nguồn, chống open redirect, path traversal, reflected/stored XSS, SQLi, CSRF, IDOR/BOLA, enumeration và rò rỉ lỗi.
- Cấu hình WAF/rate limiting, security headers (CSP phù hợp PDF viewer, HSTS khi HTTPS production, Referrer-Policy, Permissions-Policy), CORS cụ thể, secret management, TLS.
- Quy trình xuất bản phải tương thích quy định và quy chế nội bộ về bảo vệ bí mật nhà nước, dữ liệu cá nhân, bản quyền và văn thư/lưu trữ; **không tự phán đoán điều kiện pháp lý từ dữ liệu thiếu**. Cần bộ phận có thẩm quyền xác nhận tiêu chí công khai.
- Khi thu hồi: chi tiết, file preview/download, API, search, sitemap và cache **đều** không còn truy cập; thực hiện search de-index best-effort, không hứa xóa được bản đã tải về hay bản lưu ở công cụ tìm kiếm tức thời.

## 10. SEO, hiệu năng và vận hành

- SEO dành cho dữ liệu đã public: title/description, canonical, Open Graph, JSON-LD `DigitalDocument` nếu chính xác, robots/sitemap động chỉ gồm bản đang public, URL gọn không chứa ID nội bộ.
- `noindex,nofollow` cho admin, search filter vô hạn/preview chưa publish; xử lý 404/410 đúng.
- SSR/SSG/ISR theo mô hình phù hợp chính sách thu hồi; ưu tiên đảm bảo correctness khi revoke. Thiết lập caching rõ theo loại endpoint, invalidate theo event, không để CDN serve bản bị thu hồi.
- Mục tiêu hiệu năng tham chiếu: Core Web Vitals tốt trên thiết bị di động, LCP ≤ 2.5s ở môi trường chuẩn đo, CLS ≤ 0.1, INP ≤ 200ms khi đo được; danh sách phân trang không query toàn bảng; không tải viewer PDF trước khi cần.
- Logging requestId, metrics (latency, HTTP status, số lần search, download), health/readiness, cảnh báo pipeline sync lỗi; **không thu thập nội dung tìm kiếm/PII quá mức**.
- `Dockerfile` multi-stage và `docker-compose.yml` mẫu cho dev/staging (web + storage/test DB tùy cấu hình). File `.env.example` KHÔNG chứa mật khẩu, token, host production nhạy cảm.
- `README.md` hướng dẫn chạy local, migrate, seed demo, test, build, deploy Ubuntu Docker/Nginx, TLS + DNS + backup/restore + observability + rolling deployment/rollback. Hướng dẫn hoạt động trên domain `vanban.haui.edu.vn`, nhưng không tự thay DNS/production nếu không có quyền.

## 11. Công nghệ — chọn theo repo, không tùy tiện thay stack

Nếu **greenfield** và không có ràng buộc từ hạ tầng, dùng mặc định:

- **Web:** Next.js (App Router, phiên bản stable phù hợp runtime), TypeScript strict, React, Tailwind CSS, shadcn/ui hoặc component library đồng nhất, Lucide icons.
- **DB:** SQL Server, dùng driver / ORM đã kiểm thử tương thích với SQL Server (ví dụ `mssql` + typed repository), migrations SQL Server có kiểm soát; không mặc định dùng Prisma khi chưa kiểm chứng khả năng tương thích SQL Server.
- **Validation:** Zod, server-side DTO/permissions. **Search:** indexed SQL Server và accent-insensitive collation nếu được xác nhận phù hợp; Elasticsearch/OpenSearch chỉ khi khối lượng thực tế cần.
- **Auth admin:** HaUI SSO/OIDC/SAML đã có hoặc adapter kết nối theo tài liệu; trong demo dùng mock auth **chỉ dev**, đảm bảo không thể enable mock auth ở production.
- **Test:** Vitest/Jest + React Testing Library; Playwright E2E; integration test với SQL Server test container khi hạ tầng hỗ trợ.
- **Deploy:** Node LTS tương thích, Docker multi-stage, reverse proxy Nginx, HTTPS, backup.

Với repo hiện hữu: báo cáo lựa chọn reuse/khác biệt và lý do. Không nâng cấp major/dependency phá vỡ hệ thống vô cớ.

## 12. Kiểm thử và nghiệm thu bắt buộc

Viết **test tự động** và manual checklist, ít nhất:

### Security-critical (P0)

1. Dữ liệu nguồn chưa có publication → không hiện trong danh sách, tìm kiếm, facets, chi tiết, file, sitemap.
2. Đề xuất `DRAFT` / `PENDING_REVIEW` / `APPROVED` nhưng chưa `PUBLISHED` → mọi public endpoint trả không tìm thấy.
3. Văn bản `PUBLISHED` nhưng file chưa được chọn public → file không xem/tải được.
4. Văn bản bị thu hồi/hết hạn → API, SSR/HTML, file preview, download, search, sitemap đều không trả nội dung, kể cả URL cũ; kiểm tra cache.
5. File `AllowPreview=true, AllowDownload=false` → xem được (nếu chính sách cho phép), tải trực tiếp bị chặn server; lưu ý **không thể bảo đảm ngăn tuyệt đối việc lưu ảnh/byte từ viewer**, không quảng cáo tính năng chống tải tuyệt đối.
6. Người không có vai trò không thể xem admin/approve/publish/revoke; IDOR ngăn sửa publication không thuộc scope.
7. Trường E-Gov `Logs`, `NoiDungLanhDao`, `Comment`, `GU_HaUIDocumentUser` và thông tin người xử lý không bao giờ xuất hiện trong public JSON/HTML/metadata/log client.
8. Source đánh dấu mật/không xác định → mặc định chặn ở bước đề xuất/duyệt tùy chính sách xác nhận; không suy đoán `DoMat=NULL` là an toàn.
9. Thử SQL injection, XSS, filename/path traversal, MIME spoofing, upload script, brute-force/search enumeration.
10. Đổi nội dung/tệp sau duyệt phải yêu cầu duyệt phiên bản mới; transaction tránh race publish–revoke.

### Functional / UI (P1)

11. Search `số ký hiệu`, `trích yếu`, tìm có/không dấu; bộ lọc kết hợp; ngày/năm; paging, sort ổn định.
12. Xem trang chi tiết/PDF, thay đổi zoom, file lỗi/không có file, tải đúng tên/loại tệp.
13. Mobile 320–430 px không tràn ngang, menu thu gọn; tablet và desktop đúng layout.
14. Screen reader/keyboard navigation, contrast, trạng thái loading/empty/error, metadata SEO.
15. Case tiếng Việt Unicode, ngày `dd/MM/yyyy` hiển thị theo Asia/Ho_Chi_Minh, DB nullable, tài liệu trùng số ký hiệu nhưng khác nguồn.
16. Published time trong tương lai chưa xuất hiện; hết hạn thì tự ẩn khi request đến kể cả job đồng bộ chậm.
17. Admin workflow submit/reject/approve/publish/revoke với actor/việc audit chính xác.

**Mỗi lỗi P0 phải được sửa trước production.** Không xác nhận hoàn thành khi chỉ có unit test mà thiếu test public leakage/end-to-end.

## 13. Danh sách sản phẩm bàn giao

1. Mã nguồn đầy đủ chạy được (public portal + publication service/admin tích hợp phù hợp nguồn thực tế).
2. Giao diện responsive đúng nhận diện HaUI, favicon/logo chính thức, component và token thiết kế.
3. Migration bổ sung SQL Server có rollback, seed dữ liệu demo an toàn.
4. API typed + validation + RBAC + audit + file authorization.
5. `docs/DATABASE_MAPPING.md`, `docs/SOURCE_GAPS.md`, `docs/ARCHITECTURE.md`, `docs/SECURITY_PUBLICATION.md`, `docs/DECISIONS.md`.
6. `README.md`, `.env.example`, Dockerfile, cấu hình mẫu deploy, hướng dẫn backup/rollback.
7. Unit/integration/E2E tests và kết quả chạy thực tế, báo cáo các trường hợp chưa test được vì thiếu hạ tầng.
8. File `IMPLEMENTATION_PLAN_VANBAN_HAUI.md` được cập nhật checkbox theo tiến độ.
9. `docs/RELEASE_CHECKLIST.md` và quy trình publish/unpublish kiểm thử.

## 14. Quy trình thực thi Codex

**PHASE 0 — Khảo sát:** Đọc repo + `Schema.sql`, phát hiện nguồn file/SSO, kiểm tra ràng buộc, lập mapping/gaps/threat model. Không thay production.  
**PHASE 1 — Thiết kế:** Chốt kiến trúc adapter/publication DB, wireframe, design system HaUI, OpenAPI, migrations.  
**PHASE 2 — Dữ liệu & publication:** Tạo schema pub, repository, RBAC, workflow, snapshot/tệp an toàn, audit.  
**PHASE 3 — Public portal:** Trang chủ, tìm kiếm, danh sách, chi tiết, PDF, SEO, responsive.  
**PHASE 4 — Admin:** Đề xuất, kiểm tra, duyệt, xuất bản, thu hồi, lịch sử.  
**PHASE 5 — Tích hợp:** Kết nối nguồn thật đã xác minh, đồng bộ và các failure modes; không leak dữ liệu.  
**PHASE 6 — Test, hardening, deploy:** Security E2E, performance, accessibility, CI, Docker, runbook.  
**PHASE 7 — Nghiệm thu:** Báo cáo pass/fail và checklist còn lại, chỉ đề xuất cutover khi toàn bộ P0 pass.

### Cách Codex trả lời sau mỗi giai đoạn

- **Đã làm:** đường dẫn file/code cụ thể, sơ lược thay đổi.
- **Kiểm thử:** lệnh đã chạy, kết quả pass/fail, số lượng test.
- **Tiến độ:** tick task hoàn thành (chỉ khi đã test) trong kế hoạch.
- **Rủi ro/chưa xác minh:** liệt kê rõ, không làm ngơ hoặc bịa.
- **Bước tiếp theo:** tự tiếp tục task tiếp theo theo kế hoạch trong phiên làm việc, không dừng ở mô tả lý thuyết.

**Tiêu chí hoàn tất:** Có thể khởi chạy portal, tra cứu bằng dữ liệu demo được đánh dấu hoặc publication thực đã được duyệt; truy cập ẩn danh **không thể** lấy văn bản nguồn nội bộ; admin thao tác duyệt, xuất bản, thu hồi; giao diện bám guideline HaUI; tests P0 pass; README + deploy runbook đầy đủ.

**Hãy bắt đầu ngay bằng việc đọc repo và `Schema.sql`, tạo tài liệu mapping, kiểm tra điều kiện tích hợp và triển khai task đầu tiên.**
