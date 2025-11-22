import "./globals.css";
import { LanguageProvider } from "../components/LanguageContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Lamora",
  description: "Lamora Investment Platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className="bg-lamoraBlack text-gray-100">
        <LanguageProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
