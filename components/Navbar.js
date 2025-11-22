"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { lang, toggle } = useLanguage();

  const t = {
    brand: { ar: "Lamora", en: "Lamora" },
    login: { ar: "تسجيل الدخول", en: "Login" },
    signup: { ar: "إنشاء حساب", en: "Sign up" },
    invest: { ar: "لوحة التحكم", en: "Dashboard" },
    langLabel: { ar: "EN", en: "عربي" }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-lamoraBlack/80 border-b border-gray-800 backdrop-blur">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-lamoraGold to-yellow-500 flex items-center justify-center text-lamoraBlack font-black">
            L
          </span>
          <span className="font-semibold text-lg text-lamoraGold tracking-wide">
            {t.brand[lang]}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs border border-gray-700 rounded-full px-3 py-1 hover:border-lamoraGold hover:text-lamoraGold transition"
          >
            {t.langLabel[lang]}
          </button>

          <Link
            href="/auth/login"
            className="text-xs md:text-sm border border-gray-700 rounded-full px-4 py-1 hover:border-lamoraGold hover:text-lamoraGold transition"
          >
            {t.login[lang]}
          </Link>

          <Link
            href="/auth/signup"
            className="text-xs md:text-sm bg-lamoraGold text-lamoraBlack rounded-full px-4 py-1 font-semibold hover:bg-yellow-400 transition"
          >
            {t.signup[lang]}
          </Link>
        </div>
      </nav>
    </header>
  );
}
