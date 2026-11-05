import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="container inner-page">
      <EmptyState
        title="Không tìm thấy nội dung"
        text="Đường dẫn không tồn tại hoặc nội dung không còn khả dụng."
      >
        <Link className="button primary" href="/van-ban">
          <ArrowLeft size={17} /> Trở về tra cứu
        </Link>
      </EmptyState>
    </div>
  );
}
