"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState("ar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const ref = searchParams?.get("ref") || null;

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("lamora_lang");
    if (stored === "en" || stored === "ar") setLang(stored);
  }, []);

  const t = (ar, en) => (lang === "ar" ? ar : en);

  const handleSignup = async () => {
    setMessage("");

    if (!supabase) {
      setMessage(t("مشكلة في الاتصال بالخادم", "Server configuration error"));
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          referred_by: ref
        }
      }
    });

    if (error) {
      setMessage(t("❌ تعذّر إنشاء الحساب", "❌ Failed to sign up"));
    } else {
      setMessage(t("✅ تم إنشاء الحساب، جاري التحويل...", "✅ Account created, redirecting..."));
      setTimeout(() => router.push("/dashboard"), 800);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 lamora-glass p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {t("إنشاء حساب جديد", "Create a new account")}
      </h1>

      {ref && (
        <div className="mb-3 text-xs text-emerald-300 text-center">
          {t("تسجّلت من رابط إحالة:", "You are using referral code:")}{" "}
          <span className="font-mono">{ref}</span>
        </div>
      )}

      <label className="text-xs text-gray-300 mb-1 block">
        {t("البريد الإلكتروني", "Email")}
      </label>
      <input
        className="input mb-3"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("example@mail.com", "example@mail.com")}
      />

      <label className="text-xs text-gray-300 mb-1 block">
        {t("كلمة المرور", "Password")}
      </label>
      <input
        className="input mb-4"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("••••••••", "••••••••")}
      />

      <button onClick={handleSignup} className="btn-primary w-full mb-3">
        {t("إنشاء حساب", "Sign up")}
      </button>

      {message && (
        <p className="text-center text-sm text-emerald-300 font-semibold">{message}</p>
      )}
    </div>
  );
}
