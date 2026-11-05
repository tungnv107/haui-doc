import { Breadcrumb } from "@/components/ui";
export const metadata = { title: "Chính sách thông tin" };
export default function Page() {
  return (
    <div className="container inner-page">
      <Breadcrumb items={[{ label: "Chính sách thông tin" }]} />
      <article className="prose-card">
        <p className="eyebrow">THÔNG TIN VỀ BẢN DEMO</p>
        <h1>Minh bạch ngay từ trải nghiệm.</h1>
        <h2>Mục đích sử dụng</h2>
        <p>
          Website này là bản demo giao diện Cổng thông tin văn bản công khai của
          Đại học Công nghiệp Hà Nội, phục vụ xem xét thiết kế trước khi triển
          khai. Các số liệu được tính từ bộ dữ liệu mẫu, không phản ánh dữ liệu
          thực tế của nhà trường.
        </p>
        <h2>Nội dung và tệp đính kèm</h2>
        <p>
          Toàn bộ văn bản và tệp PDF được tạo để minh họa, không phải văn bản
          chính thức và không có giá trị pháp lý. Không sử dụng các nội dung này
          làm căn cứ thực hiện công việc.
        </p>
        <h2>Dữ liệu trên trình duyệt</h2>
        <p>
          Danh sách văn bản đã lưu và trạng thái quy trình quản trị mô phỏng
          được lưu cục bộ trên trình duyệt. Bản demo không thu thập tài khoản
          hoặc mật khẩu, không kết nối cơ sở dữ liệu E-Gov.
        </p>
        <h2 id="lien-he">Liên hệ và góp ý</h2>
        <p>
          Để tìm thông tin liên hệ chính thức hoặc yêu cầu điều chỉnh thông tin
          liên quan đến nhà trường, vui lòng truy cập{" "}
          <a href="https://www.haui.edu.vn" target="_blank" rel="noreferrer">
            website Đại học Công nghiệp Hà Nội
          </a>
          . Không sử dụng bản demo để gửi hồ sơ, văn bản hoặc thông tin cá nhân.
        </p>
      </article>
    </div>
  );
}
