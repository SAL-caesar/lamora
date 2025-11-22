"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../components/LanguageContext";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const t = {
    title: { ar: "تسجيل الدخول", en: "Login" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    password: { ar: "كلمة المرور", en: "Password" },
    submit: { ar: "تسجيل الدخول", en: "Login" },
    noAccount: { ar: "ليس لديك حساب؟ أنشئ حساباً", en: "No account? Sign up" }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage(lang === "ar" ? "❌ خطأ في تسجيل الدخول" : "❌ Login failed");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-lamoraGray border border-gray-800 rounded-2xl p-6">
      <h1 className="text-xl font-semibold mb-4 text-lamoraGold">
        {t.title[lang]}
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            {t.email[lang]}
          </label>
          <input
            type="email"
            required
            className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-lamoraGold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">
            {t.password[lang]}
          </label>
          <input
            type="password"
            required
            className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-lamoraGold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-lamoraGold text-lamoraBlack rounded-lg py-2 text-sm font-semibold hover:bg-yellow-400 transition disabled:opacity-60"
        >
          {loading ? "..." : t.submit[lang]}
        </button>
      </form>

      {message && (
        <p className="text-center text-sm text-red-400 mt-3">{message}</p>
      )}

      <p className="text-center text-xs text-gray-400 mt-4">
        <a href="/auth/signup" className="text-lamoraGold">
          {t.noAccount[lang]}
        </a>
      </p>
    </div>
  );
}
