"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/auth/login";
        return;
      }

      const { data: row } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(row);
    };

    load();
  }, []);

  if (!profile)
    return (
      <p className="text-white p-10">جاري التحميل...</p>
    );

  // حل المشكلة هنا 🔥
  const refLink = https://lamora.vercel.app/auth/signup?ref=${profile.ref_code};

  return (
    <div className="min-h-screen bg-lamoraBlack text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold">مرحبا {profile.email}</h1>

        <p className="mt-4 text-gray-300">
          رصيدك الحالي: ${profile.balance}
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-bold">رابط الإحالة:</h2>
          <p className="text-yellow-400 mt-2">{refLink}</p>
        </div>
      </div>
    </div>
  );
}
