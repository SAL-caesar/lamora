"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "../../../components/LanguageContext";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setRefCode(ref);
  }, [searchParams]);

  const t = {
    title: { ar: "إنشاء حساب جديد", en: "Create a new account" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    password: { ar: "كلمة المرور", en: "Password" },
    referral: { ar: "كود الإحالة (اختياري)", en: "Referral code (optional)" },
    submit: { ar: "إنشاء حساب", en: "Sign up" },
    haveAccount: { ar: "لديك حساب؟ تسجيل الدخول", en: "Already have an account? Login" }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setMessage(lang === "ar" ? "❌ فشل إنشاء الحساب" : "❌ Failed to create account");
      setLoading(false);
      return;
    }

    // حفظ كود الإحالة في جدول profiles عن طريق RPC أو RLS مناسبة
    try {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: email,
        ref_code: crypto.randomUUID().slice(0, 8),
        referred_by_code: refCode || null
      });
    } catch (e) {
      // ما منوقف المستخدم حتى لو فشل الإدخال، بس منسجل رسالة داخلية
      console.error("Profile insert error", e);
    }

    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-lamoraGray border border-gray-800 rounded-2xl p-6">
      <h1 className="text-xl font-semibold mb-4 text-lamoraGold">
        {t.title[lang]}
      </h1>

      <form onSubmit={handleSignup} className="space-y-4">
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

        <div>
          <label className="block text-xs text-gray-400 mb-1">
            {t.referral[lang]}
          </label>
          <input
            type="text"
            className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-lamoraGold"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
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
        <a href="/auth/login" className="text-lamoraGold">
          {t.haveAccount[lang]}
        </a>
      </p>
    </div>
  );
}
