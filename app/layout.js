import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Lamora",
  description: "منصة استثمار Lamora"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gradient-to-br from-black via-lamoraDark to-slate-900 text-white">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
