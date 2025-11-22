"use client";

import { useState } from "react";

export default function Navbar() {
  const [lang, setLang] = useState("ar");

  const isAr = lang === "ar";

  const t = (ar, en) => (isAr ? ar : en);

  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-lamoraGold to-yellow-300 flex items-center justify-center text-black font-extrabold text-lg shadow-lg">
            L
          </div>
          <div>
            <div className="font-bold tracking-wide text-lamoraGold">
              Lamora
            </div>
            <div className="text-xs text-gray-400">
              {t("منصة استثمار رقمية", "Digital Investment Platform")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm text-gray-300 hover:text-lamoraGold transition"
          >
            {t("الرئيسية", "Home")}
          </a>
          <a
            href="/dashboard"
            className="text-sm text-gray-300 hover:text-lamoraGold transition"
          >
            {t("لوحة التحكم", "Dashboard")}
          </a>

          <a href="/auth/login" className="btn-gold text-xs">
            {t("تسجيل الدخول", "Login")}
          </a>

          {/* سويتش لغة بسيط */}
          <button
            onClick={() => setLang(isAr ? "en" : "ar")}
            className="text-xs border border-white/20 rounded-full px-3 py-1 text-gray-300 hover:border-lamoraGold hover:text-lamoraGold transition"
          >
            {isAr ? "EN" : "AR"}
          </button>
        </div>
      </div>
    </header>
  );
}
