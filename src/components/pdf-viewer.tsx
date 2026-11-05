"use client";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Expand,
  FileWarning,
  Minus,
  Plus,
  RotateCw,
} from "lucide-react";
export default function PdfViewer({
  id,
  allowDownload,
}: {
  id: string;
  allowDownload: boolean;
}) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(2);
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const url = `/api/demo/documents/${id}/file?mode=preview`;
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function render() {
      try {
        const pdfjs = await import("pdfjs-dist");
        if (disposed) return;
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const task = pdfjs.getDocument({ url });
        cleanup = () => {
          void task.destroy();
        };
        const pdf = await task.promise;
        if (disposed) return;
        setPages(pdf.numPages);
        const current = await pdf.getPage(Math.min(page, pdf.numPages));
        if (disposed || !canvas.current) return;
        const viewport = current.getViewport({ scale: 1.5 });
        const ctx = canvas.current.getContext("2d");
        if (!ctx) throw new Error("Canvas unavailable");
        canvas.current.width = viewport.width;
        canvas.current.height = viewport.height;
        const job = current.render({
          canvas: canvas.current,
          canvasContext: ctx,
          viewport,
        });
        cleanup = () => {
          job.cancel();
          void task.destroy();
        };
        await job.promise;
        if (!disposed) setLoading(false);
      } catch {
        if (!disposed) {
          setFailed(true);
          setLoading(false);
        }
      }
    }
    void render();
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [url, page, retry]);
  return (
    <div className="pdf-viewer" ref={container}>
      <div className="pdf-toolbar">
        <div>
          <button
            className="icon-button"
            aria-label="Trang PDF trước"
            disabled={page === 1}
            onClick={() => {
              setLoading(true);
              setPage(page - 1);
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <span>
            Trang <b>{page}</b> / {pages}
          </span>
          <button
            className="icon-button"
            aria-label="Trang PDF sau"
            disabled={page === pages}
            onClick={() => {
              setLoading(true);
              setPage(page + 1);
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div>
          <button
            className="icon-button"
            aria-label="Thu nhỏ PDF"
            disabled={zoom <= 75}
            onClick={() => setZoom(zoom - 25)}
          >
            <Minus size={17} />
          </button>
          <span className="zoom-label">{zoom}%</span>
          <button
            className="icon-button"
            aria-label="Phóng to PDF"
            disabled={zoom >= 200}
            onClick={() => setZoom(zoom + 25)}
          >
            <Plus size={17} />
          </button>
          <button
            className="icon-button"
            aria-label="Xem toàn màn hình"
            onClick={() => {
              if (document.fullscreenElement) void document.exitFullscreen();
              else void container.current?.requestFullscreen().catch(() => {});
            }}
          >
            <Expand size={17} />
          </button>
          {allowDownload && (
            <a
              className="icon-button"
              href={`/api/demo/documents/${id}/file?mode=download`}
              aria-label="Tải PDF"
            >
              <Download size={17} />
            </a>
          )}
        </div>
      </div>
      <div
        className="pdf-stage"
        role="region"
        aria-label="Trang PDF có thể cuộn"
        tabIndex={0}
      >
        {loading && (
          <div className="pdf-loading" role="status">
            <span className="spinner" />
            Đang tải văn bản…
          </div>
        )}
        {failed ? (
          <div className="pdf-error" role="alert">
            <FileWarning size={32} />
            <h3>Chưa thể hiển thị bản PDF</h3>
            <p>Vui lòng thử tải lại văn bản.</p>
            <button
              className="button secondary"
              onClick={() => {
                setLoading(true);
                setFailed(false);
                setRetry(retry + 1);
              }}
            >
              <RotateCw size={16} /> Thử lại
            </button>
            {allowDownload && (
              <a href={`/api/demo/documents/${id}/file?mode=download`}>
                Tải tệp PDF để xem
              </a>
            )}
          </div>
        ) : (
          <canvas
            ref={canvas}
            aria-label={`Bản PDF minh họa, trang ${page} trên ${pages}`}
            style={{ width: `${zoom}%`, opacity: loading ? 0 : 1 }}
          />
        )}
      </div>
      <div className="pdf-caption">BẢN DEMO · KHÔNG CÓ GIÁ TRỊ ÁP DỤNG</div>
    </div>
  );
}
