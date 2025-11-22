"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMsg("خطأ في تسجيل الدخول، تحقق من البيانات");
      setLoading(false);
      return;
    }

    setMsg("تم تسجيل الدخول، جاري تحويلك...");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);
  };

  return (
    <div className="min-h-screen bg-lamoraBlack">
      <Navbar />
      <main className="page-container max-w-md">
        <div className="card space-y-4 mt-6">
          <h2 className="text-xl font-bold text-center text-lamoraGold">
            تسجيل الدخول
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

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn-gold w-full mt-2 disabled:opacity-60"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>

          {msg && (
            <p className="text-center text-sm text-gray-200">{msg}</p>
          )}

          <p className="text-xs text-center text-gray-400">
            ليس لديك حساب؟{" "}
            <a href="/auth/signup" className="text-lamoraGold">
              إنشاء حساب
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
