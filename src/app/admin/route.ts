// No real admin surface or mock authentication exists at this route.
export function GET() {
  return new Response("Không tìm thấy trang", {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
