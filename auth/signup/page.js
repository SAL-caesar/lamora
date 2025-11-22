"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState(""); // رمز الإحالة
  const [message, setMessage] = useState("");

  // التقاط رمز الإحالة من الرابط
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");
    if (ref) setRefCode(ref);
  }, []);

  const handleSignup = async () => {
    setMessage("");

    // تسجيل المستخدم في auth
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (authError) {
      setMessage("فشل إنشاء الحساب");
      return;
    }

    // حفظ البيانات في جدول profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: authData.user.id,
          ref_code: generateRefCode(),
          referred_by_code: refCode || null,
        },
      ]);

    if (profileError) {
      setMessage("حدث خطأ أثناء حفظ البيانات");
      return;
    }

    window.location.href = "/dashboard";
  };

  // توليد كود إحالة
  function generateRefCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  return (
    <div className="signup-container">
      <h2>إنشاء حساب</h2>

      <input
        type="email"
        placeholder="البريد الإلكتروني"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="كلمة المرور"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* حقل رمز الإحالة (اختياري) */}
      <input
        type="text"
        placeholder="رمز الإحالة (اختياري)"
        value={refCode}
        onChange={(e) => setRefCode(e.target.value)}
      />

      <button onClick={handleSignup}>إنشاء حساب</button>

      {message && <p>{message}</p>}
    </div>
  );
}
