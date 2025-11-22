"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data: session } = await supabase.auth.getSession();
    const user = session.session?.user;

    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-lamoraBlack text-white">
        <Navbar />
        <div className="page-container text-center mt-10">
          جاري التحميل...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-lamoraBlack text-white">
        <Navbar />
        <div className="page-container mt-10 text-center">
          حدث خطأ أثناء تحميل البيانات
        </div>
      </div>
    );
  }

 const refLink = https://lamora.vercel.app/auth/signup?ref=${profile.ref_code};

  return (
    <div className="min-h-screen bg-lamoraBlack text-white">
      <Navbar />

      <main className="page-container mt-10 space-y-6">
        <div className="card">
          <h2 className="text-lg font-bold mb-2">رصيدك</h2>
          <div className="text-2xl font-bold text-lamoraGold">
            ${profile.balance}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold mb-2">رابط الإحالة</h2>
          <div className="input bg-black/30">{refLink}</div>
        </div>

        <a href="/withdraw" className="btn-gold inline-block">
          طلب سحب
        </a>
      </main>
    </div>
  );
}
