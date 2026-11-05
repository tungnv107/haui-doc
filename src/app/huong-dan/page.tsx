import Link from "next/link";
import {
  Bookmark,
  Download,
  Search,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui";
export const metadata = { title: "Hướng dẫn tra cứu" };
export default function Page() {
  return (
    <div className="container inner-page">
      <Breadcrumb items={[{ label: "Hướng dẫn" }]} />
      <div className="page-heading">
        <div>
          <p className="eyebrow">LUÔN SẴN SÀNG HỖ TRỢ BẠN</p>
          <h1>Tìm văn bản, thật đơn giản.</h1>
          <p>Một vài hướng dẫn nhỏ để bạn tra cứu nhanh và chính xác hơn.</p>
        </div>
      </div>
      <div className="guide-grid">
        {[
          {
            icon: Search,
            title: "Bắt đầu bằng từ khóa",
            content:
              "Nhập số ký hiệu hoặc một phần tên văn bản. Ví dụ: “học bổng”, “1248” hoặc “quy che dao tao”. Hệ thống hỗ trợ cả tiếng Việt có dấu và không dấu.",
          },
          {
            icon: SlidersHorizontal,
            title: "Thu hẹp kết quả",
            content:
              "Kết hợp loại văn bản, lĩnh vực, đơn vị và thời gian ban hành. Các bộ lọc được áp dụng đồng thời. Chọn “Đặt lại” để bắt đầu một lượt tra cứu mới.",
          },
          {
            icon: Download,
            title: "Xem và tải văn bản",
            content:
              "Nhấn vào tên văn bản để xem thông tin chi tiết và bản PDF. Bạn có thể chuyển trang, phóng to hoặc tải tệp khi văn bản cho phép tải xuống.",
          },
          {
            icon: Bookmark,
            title: "Lưu lại để đọc sau",
            content:
              "Nhấn biểu tượng đánh dấu bên cạnh văn bản. Danh sách “Văn bản đã lưu” được lưu riêng trên trình duyệt đang sử dụng, không cần tài khoản.",
          },
        ].map(({ icon: Icon, title, content }, i) => (
          <article className="guide-card" key={title}>
            <div>
              <Icon size={24} />
              <span>0{i + 1}</span>
            </div>
            <h2>{title}</h2>
            <p>{content}</p>
          </article>
        ))}
      </div>
      <div className="faq-panel">
        <h2>Câu hỏi thường gặp</h2>
        {[
          [
            "Tôi có cần đăng nhập để tra cứu không?",
            "Không. Khách truy cập có thể tìm kiếm và xem các văn bản công khai. Khu vực quản trị trong demo chỉ mô phỏng quy trình nghiệp vụ.",
          ],
          [
            "Vì sao một số văn bản không có nút tải?",
            "Mỗi tệp có thể được cho phép xem và tải riêng. Văn bản chỉ cho xem sẽ không hiển thị nút tải. Việc cho xem không bảo đảm ngăn được sao chép nội dung.",
          ],
          [
            "Có thể chia sẻ kết quả tìm kiếm không?",
            "Có. Từ khóa và bộ lọc được lưu trên URL. Bạn chỉ cần sao chép địa chỉ trên trình duyệt. Trang chi tiết cũng có nút sao chép liên kết.",
          ],
          [
            "Văn bản trong bản demo có giá trị áp dụng không?",
            "Không. Toàn bộ tiêu đề, số ký hiệu, thời gian và tệp PDF là dữ liệu giả lập, chỉ dùng để đánh giá giao diện. Hệ thống chưa kết nối với E-Gov hoặc SSO của HaUI.",
          ],
        ].map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <div className="guide-cta">
        <div>
          <h2>Sẵn sàng tìm văn bản bạn cần?</h2>
          <p>Khám phá thư viện văn bản mẫu ngay bây giờ.</p>
        </div>
        <Link className="button primary" href="/van-ban">
          Bắt đầu tra cứu <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
