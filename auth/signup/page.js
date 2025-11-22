"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // التقاط ref من URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setRefCode(ref);
  }, []);

  const handleSignup = async () => {
    setMsg("");
    setLoading(true);

    // 1) إنشاء مستخدم في Auth
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password
      });

    if (authError) {
      setMsg("فشل إنشاء الحساب، تأكد من البريد وكلمة المرور");
      setLoading(false);
      return;
    }

    const userId = authData.user.id;
    const myRefCode = generateRefCode();

    // 2) حفظ في جدول users
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: userId,
        email,
        balance: 0,
        ref_code: myRefCode,
        referred_by: refCode || null
      }
    ]);

    if (dbError) {
      console.error(dbError);
      setMsg("تم إنشاء الحساب لكن حدث خطأ في حفظ البيانات.");
      setLoading(false);
      return;
    }

    setMsg("تم إنشاء الحساب بنجاح، سيتم توجيهك للوحة التحكم...");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  function generateRefCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  return (
    <div className="min-h-screen bg-lamoraBlack">
      <Navbar />
      <main className="page-container max-w-md">
        <div className="card space-y-4 mt-6">
          <h2 className="text-xl font-bold text-center text-lamoraGold">
            إنشاء حساب جديد
          </h2>

          <input
            className="input"
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="input"
            type="text"
            placeholder="رمز الإحالة (اختياري)"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn-gold w-full mt-2 disabled:opacity-60"
          >
            {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
          </button>

          {msg && (
            <p className="text-center text-sm text-gray-200">{msg}</p>
          )}

          <p className="text-xs text-center text-gray-400">
            لديك حساب؟{" "}
            <a href="/auth/login" className="text-lamoraGold">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
