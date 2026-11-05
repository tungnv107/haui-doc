import { Suspense } from "react";
import { SearchPage } from "@/components/search-page";
export const metadata = { title: "Tra cứu văn bản" };
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container page-loading">Đang tải bộ lọc tra cứu…</div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
