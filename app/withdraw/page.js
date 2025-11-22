"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useLanguage } from "../../components/LanguageContext";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function WithdrawPage() {
  const { lang } = useLanguage();

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) return;
      setUser(user);

      const { data: wallet } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", user.id)
        .maybeSingle();

      setBalance(wallet?.balance || 0);
    };

    load();
  }, []);

  const t = {
    title: { ar: "طلب سحب", en: "Withdrawal request" },
    available: { ar: "الرصيد المتاح", en: "Available balance" },
    amount: { ar: "المبلغ المراد سحبه", en: "Amount to withdraw" },
    submit: { ar: "إرسال الطلب", en: "Submit request" }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage("");

    const value = Number(amount);
    if (!value  value <= 0  value > balance) {
      setMessage(
        lang === "ar"
          ? "❌ المبلغ غير صالح"
          : "❌ Invalid amount"
      );
      return;
    }

    // مجرد تسجيل عملية في جدول transactions
    try {
      await supabase.from("transactions").insert({
        user_id: user.id,
        type: "withdraw",
        amount: value
      });

      setMessage(
        lang === "ar"
          ? "✅ تم تسجيل طلب السحب"
          : "✅ Withdrawal request recorded"
      );
      setAmount("");
    } catch (e) {
      setMessage(
        lang === "ar"
          ? "❌ حدث خطأ أثناء تسجيل الطلب"
          : "❌ Error while saving request"
      );
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-400">
        {lang === "ar"
          ? "يرجى تسجيل الدخول أولاً."
          : "Please login first."}
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-lamoraGray border border-gray-800 rounded-2xl p-6">
      <h1 className="text-xl font-semibold mb-4 text-lamoraGold">
        {t.title[lang]}
      </h1>

      <p className="text-xs text-gray-300 mb-3">
        {t.available[lang]}:{" "}
        <span className="font-semibold">${Number(balance).toFixed(2)}</span>
      </p>

      <form onSubmit={handleWithdraw} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            {t.amount[lang]}
          </label>
          <input
            type="number"
            min="1"
            className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-lamoraGold"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-lamoraGold text-lamoraBlack rounded-lg py-2 text-sm font-semibold hover:bg-yellow-400 transition"
        >
          {t.submit[lang]}
        </button>
      </form>

      {message && (
        <p className="text-center text-sm mt-3 text-gray-200">{message}</p>
      )}
    </div>
  );
}
