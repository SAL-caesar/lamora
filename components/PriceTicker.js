"use client";

import { useLanguage } from "./LanguageContext";

const coins = [
  { symbol: "BTC", nameAr: "بيتكوين", nameEn: "Bitcoin", price: "64,320", change: "+2.3%" },
  { symbol: "ETH", nameAr: "إيثريوم", nameEn: "Ethereum", price: "3,120", change: "-0.8%" },
  { symbol: "USDT", nameAr: "تيثر", nameEn: "Tether", price: "1.00", change: "+0.01%" },
  { symbol: "BNB", nameAr: "بينانس كوين", nameEn: "BNB", price: "412", change: "+1.1%" }
];

export default function PriceTicker() {
  const { lang } = useLanguage();

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-r from-lamoraGray to-black">
      <div className="flex animate-[ticker_25s_linear_infinite]">
        {[...coins, ...coins].map((coin, idx) => (
          <div
            key={idx}
            className="min-w-[180px] px-4 py-3 flex flex-col border-l border-gray-800/60"
          >
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{coin.symbol}</span>
              <span
                className={
                  coin.change.startsWith("-")
                    ? "text-red-400 font-medium"
                    : "text-green-400 font-medium"
                }
              >
                {coin.change}
              </span>
            </div>
            <div className="flex items-end justify-between mt-1">
              <div className="text-sm">
                <div className="font-semibold text-gray-100">
                  {lang === "ar" ? coin.nameAr : coin.nameEn}
                </div>
                <div className="text-xs text-gray-400">${coin.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      }</style>
    </div>
  );
}
