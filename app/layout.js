import "./globals.css";

export const metadata = {
  title: "Lamora Investments",
  description: "منصة استثمار بنظام إحالات احترافي"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-lamoraBlack text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
