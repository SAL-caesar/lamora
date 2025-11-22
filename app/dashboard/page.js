"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useLanguage } from "../../components/LanguageContext";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function DashboardPage() {
  const { lang } = useLanguage();

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [refCount, setRefCount] = useState(0);
  const [refCode, setRefCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (error || !user) {
        setLoading(false);
        return;
      }

      setUser(user);

      // profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("ref_code")
        .eq("id", user.id)
        .maybeSingle();

      setRefCode(profile?.ref_code || "");

      // wallet
      const { data: wallet } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", user.id)
        .maybeSingle();

      setBalance(wallet?.balance || 0);

      // referrals
      const { count } = await supabase
        .from("referrals")
        .select("id", { count: "exact", head: true })
        .eq("referrer_id", user.id);

      setRefCount(count || 0);
      setLoading(false);
    };

    load();
  }, []);

  const t = {
    title: { ar: "لوحة التحكم", en: "Dashboard" },
    needLogin: {
      ar: "يرجى تسجيل الدخول لعرض لوحة التحكم.",
      en: "Please login to view your dashboard."
    },
    balance: { ar: "رصيد المحفظة", en: "Wallet balance" },
    usd: { ar: "دولار", en: "USD" },
    referrals: { ar: "عدد الإحالات", en: "Total referrals" },
    referralLink: { ar: "رابط الإحالة الخاص بك", en: "Your referral link" }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-400">...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-400">
        {t.needLogin[lang]}{" "}
        <a href="/auth/login" className="text-lamoraGold">
          Login
        </a>
      </p>
    );
  }

  const refLink =
    typeof window !== "undefined"
      ? ${window.location.origin}/auth/signup?ref=${refCode}
      : https://lamora.example/auth/signup?ref=${refCode};

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-lamoraGold mb-4">
        {t.title[lang]}
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-800 bg-lamoraGray p-4">
          <div className="text-xs text-gray-400 mb-1">{t.balance[lang]}</div>
          <div className="text-2xl font-semibold">
            ${Number(balance).toFixed(2)}{" "}
            <span className="text-sm text-gray-400">{t.usd[lang]}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-lamoraGray p-4">
          <div className="text-xs text-gray-400 mb-1">
            {t.referrals[lang]}
          </div>
          <div className="text-2xl font-semibold">{refCount}</div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-lamoraGray p-4">
          <div className="text-xs text-gray-400 mb-1">Email</div>
          <div className="text-sm font-medium">{user.email}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-lamoraGray p-4">
        <div className="text-xs text-gray-400 mb-2">{t.referralLink[lang]}</div>
        <div className="text-xs break-all bg-black border border-gray-800 rounded-lg px-3 py-2">
          {refLink}
        </div>
      </div>
    </div>
  );
}
