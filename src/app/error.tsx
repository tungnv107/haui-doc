"use client";
import { EmptyState } from "@/components/ui";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container inner-page">
      <EmptyState
        title="Nội dung tạm thời chưa tải được"
        text="Vui lòng thử lại để tiếp tục tra cứu văn bản."
      >
        <button onClick={reset} className="button primary">
          Thử lại
        </button>
      </EmptyState>
    </div>
  );
}
