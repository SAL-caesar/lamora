"use client";

import PriceTicker from "../components/PriceTicker";
import InvestPlans from "../components/InvestPlans";
import { useLanguage } from "../components/LanguageContext";
import Link from "next/link";

export default function HomePage() {
  const { lang } = useLanguage();

  const t = {
    heroTitle: {
      ar: "استثمر بثقة مع Lamora",
      en: "Invest with confidence with Lamora"
    },
    heroSubtitle: {
      ar: "منصة استثمار ذكية، نظام إحالات مجزٍ، ولوحة تحكم واضحة لرصيدك وأرباحك.",
      en: "Smart investment platform, rewarding referral system, and a clear dashboard for your balance and profits."
    },
    cta: {
      ar: "ابدأ الاستثمار الآن",
      en: "Start investing now"
    },
    secondaryCta: {
      ar: "جرّب لوحة التحكم",
      en: "View dashboard demo"
    },
    pricesTitle: {
      ar: "أسعار العملات الرقمية",
      en: "Crypto Prices"
    }
  };

  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            {t.heroTitle[lang]}
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-6">
            {t.heroSubtitle[lang]}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/auth/signup"
              className="bg-lamoraGold text-lamoraBlack px-5 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400 transition"
            >
              {t.cta[lang]}
            </Link>
            <Link
              href="/dashboard"
              className="border border-gray-700 text-gray-200 px-5 py-2 rounded-full text-sm hover:border-lamoraGold hover:text-lamoraGold transition"
            >
              {t.secondaryCta[lang]}
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-lamoraGray to-black p-4">
          <h2 className="text-sm text-gray-300 mb-3">
            {t.pricesTitle[lang]}
          </h2>
          <PriceTicker />
        </div>
      </section>

      <InvestPlans />
    </div>
  );
}
