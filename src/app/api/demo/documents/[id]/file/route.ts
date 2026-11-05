import { readFile } from "node:fs/promises";
import path from "node:path";
import { documents } from "@/lib/documents";
export const dynamic = "force-dynamic";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const doc = documents.find((d) => d.id === id);
  const mode = new URL(request.url).searchParams.get("mode");
  if (!doc || !["preview", "download"].includes(mode || ""))
    return new Response("Không tìm thấy tệp", { status: 404 });
  if (mode === "download" && !doc.allowDownload)
    return new Response("Tệp chỉ được phép xem", {
      status: 403,
      headers: { "Cache-Control": "no-store" },
    });
  try {
    const bytes = await readFile(
      path.join(process.cwd(), "data", "pdf", `${doc.id}.pdf`),
    );
    return new Response(bytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${mode === "download" ? "attachment" : "inline"}; filename="${doc.id}.pdf"; filename*=UTF-8''${encodeURIComponent(doc.sign.replaceAll("/", "-") + "-demo.pdf")}`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new Response("Tệp demo tạm thời chưa sẵn sàng", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
