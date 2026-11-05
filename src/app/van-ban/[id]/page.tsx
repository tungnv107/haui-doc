import { notFound } from "next/navigation";
import { documents } from "@/lib/documents";
import { DetailPage } from "@/components/detail-page";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title:
      documents.find((d) => d.id === id)?.title || "Không tìm thấy văn bản",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = documents.find((d) => d.id === id);
  if (!doc) notFound();
  return <DetailPage doc={doc} />;
}
