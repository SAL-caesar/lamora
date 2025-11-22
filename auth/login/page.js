"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function LoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState("ar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("lamora_lang");
    if (stored === "en" || stored === "ar") setLang(stored);
  }, []);

  const t = (ar, en) => (lang === "ar" ? ar : en);

  const handleLogin = async () => {
    setMessage("");
    if (!supabase) {
      setMessage(t("مشكلة في الاتصال بالخادم", "Server configuration error"));
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(t("❌ خطأ في تسجيل الدخول", "❌ Login failed"));
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 lamora-glass p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {t("تسجيل الدخول إلى Lamora", "Login to Lamora")}
      </h1>

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

      <button onClick={handleLogin} className="btn-primary w-full mb-3">
        {t("تسجيل الدخول", "Login")}
      </button>

      {message && (
        <p className="text-center text-sm text-red-400 font-semibold">{message}</p>
      )}
    </div>
  );
}
