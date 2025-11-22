"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("lamora_lang");
    if (stored === "en" || stored === "ar") setLang(stored);
  }, []);

  const toggleLang = () => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("lamora_lang", next);
    }
  };

  const t = (ar, en) => (lang === "ar" ? ar : en);

  return (
    <header className="border-b border-white/10 bg-black/30 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lamoraPrimary to-emerald-500 flex items-center justify-center text-black font-extrabold">
            L
          </div>
          <span className="font-semibold text-lg">Lamora</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-lamoraPrimary">
            {t("لوحة التحكم", "Dashboard")}
          </Link>
          <Link href="/auth/login" className="hover:text-lamoraPrimary">
            {t("تسجيل الدخول", "Login")}
          </Link>
          <Link href="/auth/signup" className="hover:text-lamoraPrimary">
            {t("إنشاء حساب", "Sign up")}
          </Link>

          <button
            onClick={toggleLang}
            className="px-3 py-1 rounded-full border border-white/20 text-xs hover:border-lamoraPrimary"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
        </nav>
      </div>
    </header>
  );
}
