"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState(null);
  const [userRow, setUserRow] = useState(null);
  const [refCount, setRefCount] = useState(0);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
    setSessionUser(user);

    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    setUserRow(userData || null);

    // عدد الإحالات
    const { data: refs } = await supabase
      .from("referrals")
      .select("id")
      .eq("referrer_id", user.id);

    setRefCount(refs?.length || 0);

    setLoading(false);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-lamoraBlack">
        <Navbar />
        <main className="page-container">
          <p className="text-center mt-10 text-gray-300">
            جاري التحميل...
          </p>
        </main>
      </div>
    );
  }

  if (!userRow) {
    return (
      <div className="min-h-screen bg-lamoraBlack">
        <Navbar />
        <main className="page-container">
          <p className="mt-10 text-center text-red-400">
            لم يتم العثور على بيانات المستخدم.
          </p>
        </main>
      </div>
    );
  }

  const refLink = https://lamora.vercel.app/auth/signup?ref=${userRow.ref_code};

  return (
    <div className="min-h-screen bg-lamoraBlack">
      <Navbar />

      <main className="page-container space-y-6 mt-4">
        <section className="grid md:grid-cols-3 gap-4">
          <div className="card">
            <div className="text-sm text-gray-400">الرصيد الكلي</div>
            <div className="text-2xl font-bold mt-2">
              ${Number(userRow.balance || 0).toFixed(2)}
            </div>
          </div>

          <div className="card">
            <div className="text-sm text-gray-400">عدد الإحالات</div>
            <div className="text-2xl font-bold mt-2">{refCount}</div>
          </div>

          <div className="card">
            <div className="text-sm text-gray-400">
              البريد المسجّل
            </div>
            <div className="text-sm mt-2 break-all">
              {sessionUser.email}
            </div>
          </div>
        </section>

        {/* الإحالة */}
        <section className="card space-y-3">
          <h2 className="text-lg font-semibold">نظام الإحالة</h2>
          <p className="text-sm text-gray-300">
            شارك رمز الإحالة أو الرابط التالي لتحصل أنت وصديقك على{" "}
            <span className="text-lamoraGold font-semibold">3$</span>{" "}
            لكل تسجيل جديد.
          </p>

          <div>
            <div className="text-xs text-gray-400 mb-1">
              رمز الإحالة:
            </div>
            <div className="flex items-center gap-2">
              <div className="input bg-black/60 font-mono">
                {userRow.ref_code}
              </div>
              <button
                className="btn-gold text-xs"
                onClick={() =>
                  navigator.clipboard.writeText(userRow.ref_code)
                }
              >
                نسخ
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 mb-1">
              رابط الإحالة:
                </div>
            <div className="flex items-center gap-2">
              <div className="input bg-black/60 text-xs truncate">
                {refLink}
              </div>
              <button
                className="btn-gold text-xs"
                onClick={() =>
                  navigator.clipboard.writeText(refLink)
                }
              >
                نسخ
              </button>
            </div>
          </div>
        </section>

        {/* أزرار سريعة */}
        <section className="flex flex-wrap gap-3">
          <a href="/withdraw" className="btn-gold text-sm">
            طلب سحب
          </a>
          <button
            onClick={handleLogout}
            className="border border-red-500/70 text-red-400 rounded-xl px-4 py-2 text-sm hover:bg-red-500/10 transition"
          >
            تسجيل الخروج
          </button>
        </section>
      </main>
    </div>
  );
}
