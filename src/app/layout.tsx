import type { Metadata } from "next";
import "@fontsource/be-vietnam-pro/latin-400.css";
import "@fontsource/be-vietnam-pro/vietnamese-400.css";
import "@fontsource/be-vietnam-pro/latin-500.css";
import "@fontsource/be-vietnam-pro/vietnamese-500.css";
import "@fontsource/be-vietnam-pro/latin-600.css";
import "@fontsource/be-vietnam-pro/vietnamese-600.css";
import "@fontsource/be-vietnam-pro/latin-700.css";
import "@fontsource/be-vietnam-pro/vietnamese-700.css";
import "./globals.css";
import { DemoProvider } from "@/components/ui";
import { Footer, Header } from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "Cổng thông tin văn bản công khai HaUI | Demo",
    template: "%s | Văn bản HaUI · Demo",
  },
  description:
    "Trải nghiệm giao diện demo tra cứu văn bản công khai của Đại học Công nghiệp Hà Nội. Tất cả văn bản là dữ liệu minh họa.",
  robots: { index: false, follow: false },
  icons: { icon: "/brand/haui-logo.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <DemoProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </DemoProvider>
      </body>
    </html>
  );
}
