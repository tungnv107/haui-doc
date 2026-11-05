# Triển khai demo trên Oracle server

Repo: https://github.com/tungnv107/haui-doc

Ứng dụng vẫn là demo giao diện với dữ liệu giả lập; không có SSO, cơ sở dữ liệu hoặc phân quyền thật. Docker chạy bản build Next.js standalone, bao gồm font, PDF worker và 24 PDF mẫu.

## Server và Nginx Proxy Manager

- Server: `161.118.222.102`, tài khoản SSH `ubuntu`.
- Thư mục: `/home/ubuntu/haui-doc`.
- Container: `haui-doc`, tự khởi động lại qua `restart: unless-stopped`.
- Truy cập tại server: `http://127.0.0.1:3003`.
- App tham gia mạng Docker `npm_proxy` hiện có của Nginx Proxy Manager.

Trong Nginx Proxy Manager → Add Proxy Host:

| Trường | Giá trị |
| --- | --- |
| Domain Names | Domain bạn muốn sử dụng |
| Scheme | `http` |
| Forward Hostname / IP | `haui-doc` |
| Forward Port | `3003` |

NPM chạy trong container nên `127.0.0.1` ở giao diện NPM là chính container NPM. Dùng hostname `haui-doc` để NPM truy cập app qua mạng Docker chung. Port host chỉ bind loopback, không cần mở port 3003 trên firewall. Trỏ DNS của domain về server, rồi cấu hình SSL trong NPM.

## Triển khai và cập nhật

Lần đầu, clone repo vào thư mục chưa tồn tại:

```sh
git clone https://github.com/tungnv107/haui-doc.git /home/ubuntu/haui-doc
cd /home/ubuntu/haui-doc
docker compose up -d --build --wait --wait-timeout 120
```

Các lần cập nhật sau:

```sh
cd /home/ubuntu/haui-doc
git pull --ff-only origin main
docker compose up -d --build --wait --wait-timeout 120
docker compose ps
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3003/
docker exec npm-app-1 curl -fsS -o /dev/null -w '%{http_code}\n' http://haui-doc:3003/
```

Xem log bằng `docker compose logs --tail=100 web`. Docker image chạy bằng user `node`, có healthcheck HTTP và giới hạn dung lượng log. SSH key chỉ dùng từ máy quản trị, không được sao chép vào repo hay image.

## Kiểm tra qua SSH tunnel

Từ máy có Chrome và dependencies của dự án, mở SSH tunnel tới port `3003` của server. Ví dụ, chuyển tiếp local port `43003` tới `127.0.0.1:3003` trên server bằng tùy chọn SSH `-L 127.0.0.1:43003:127.0.0.1:3003 -N`.

Trong PowerShell khác tại thư mục dự án:

```powershell
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:43003'
npm run test:e2e
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

Khi có `PLAYWRIGHT_BASE_URL`, Playwright kiểm tra trực tiếp bản triển khai và không khởi chạy server dev.
