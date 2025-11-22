"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("lamora_lang");
    if (stored === "en" || stored === "ar") setLang(stored);
  }, []);

  const t = (ar, en) => (lang === "ar" ? ar : en);

  return (
    <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          {t("استثمر بثقة مع Lamora", "Invest with confidence using Lamora")}
        </h1>
        <p className="text-sm md:text-base text-gray-300 mb-6">
          {t(
            "منصة استثمار حديثة توفّر لك محفظة ذكية، نظام إحالات بمكافأة 3$، ولوحة تحكم تتابع منها كل شيء.",
            "A modern investment platform with a smart wallet, $3 referral rewards, and a powerful dashboard."
          )}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/auth/signup" className="btn-primary">
            {t("ابدأ الآن", "Get started")}
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg border border-white/20 text-sm hover:border-lamoraPrimary"
          >
            {t("استعراض لوحة التحكم", "View dashboard")}
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          {t(
            "مكافأة إحالة: 3$ تذهب مباشرة إلى رصيد المحفظة عند تسجيل مستخدم جديد من رابطك.",
            "Referral bonus: $3 goes straight to your wallet when a new user signs up with your link."
          )}
        </div>
      </div>

      <div className="lamora-glass p-6 md:p-8">
        <h2 className="font-semibold mb-4 text-lg">
          {t("لمحة عن استثماراتك", "Your investments snapshot")}
        </h2>
        <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="bg-black/40 rounded-lg p-3">
            <div className="text-gray-400">{t("إجمالي الرصيد", "Total balance")}</div>
            <div className="text-2xl font-bold mt-1">$12,430</div>
          </div>
          <div className="bg-black/40 rounded-lg p-3">
            <div className="text-gray-400">{t("ربح اليوم", "Today P/L")}</div>
            <div className="text-2xl font-bold mt-1 text-lamoraPrimary">+3.2%</div>
          </div>
          <div className="bg-black/40 rounded-lg p-3 col-span-2">
            <div className="text-gray-400">{t("المستخدمون النشطون", "Active investors")}</div>
            <div className="text-xl font-bold mt-1">2,194</div>
          </div>
        </div>
      </div>
    </div>
  );
}
