export default function Loading() {
  return (
    <div
      className="container skeleton-page"
      role="status"
      aria-label="Đang tải nội dung"
    >
      <div className="skeleton small" />
      <div className="skeleton heading" />
      <div className="skeleton search" />
      {[1, 2, 3, 4].map((i) => (
        <div className="skeleton row" key={i} />
      ))}
    </div>
  );
}
