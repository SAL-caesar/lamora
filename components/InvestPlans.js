"use client";

import { useLanguage } from "./LanguageContext";

const plans = [
  {
    id: 1,
    nameAr: "الخطة اليومية",
    nameEn: "Daily Plan",
    descAr: "عوائد يومية ثابتة، مرونة سحب عالية.",
    descEn: "Stable daily returns with high withdrawal flexibility.",
    roi: "1.2% / يوم",
    roiEn: "1.2% / day",
    min: 50,
    max: 500
  },
  {
    id: 2,
    nameAr: "خطة المستثمر",
    nameEn: "Investor Plan",
    descAr: "مصممة للاستثمار المتوسط بربحية أعلى.",
    descEn: "Designed for mid-term investors with higher yield.",
    roi: "9% / شهر",
    roiEn: "9% / month",
    min: 500,
    max: 5000
  },
  {
    id: 3,
    nameAr: "خطة النخبة",
    nameEn: "Elite Plan",
    descAr: "لكبار المستثمرين مع مزايا خاصة.",
    descEn: "For elite investors with special benefits.",
    roi: "15% / شهر",
    roiEn: "15% / month",
    min: 5000,
    max: 50000
  }
];

export default function InvestPlans() {
  const { lang } = useLanguage();

  const t = {
    title: { ar: "باقات الاستثمار", en: "Investment Plans" },
    cta: { ar: "ابدأ الآن", en: "Start Now" },
    range: { ar: "من", en: "From" },
    to: { ar: "إلى", en: "to" },
    usd: { ar: "دولار", en: "USD" }
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-lamoraGold">
        {t.title[lang]}
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-gray-800 bg-gradient-to-b from-lamoraGray/80 to-black px-4 py-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {lang === "ar" ? p.nameAr : p.nameEn}
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                {lang === "ar" ? p.descAr : p.descEn}
              </p>
              <div className="text-sm text-lamoraGold font-semibold mb-2">
                {lang === "ar" ? p.roi : p.roiEn}
              </div>
              <div className="text-xs text-gray-400">
                {t.range[lang]} ${p.min} {t.to[lang]} ${p.max} {t.usd[lang]}
              </div>
            </div>
            <button className="mt-4 text-xs border border-lamoraGold/60 text-lamoraGold rounded-full py-2 hover:bg-lamoraGold hover:text-lamoraBlack transition">
              {t.cta[lang]}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
