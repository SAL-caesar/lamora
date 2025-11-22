"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabaseClient";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");

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
  }

  async function submitWithdraw() {
    setMsg("");

    const value = Number(amount);

    if (isNaN(value) || value <= 0) {
      setMsg("أدخل مبلغاً صالحاً");
      return;
    }

    if (value > profile.balance) {
      setMsg("المبلغ أكبر من رصيدك");
      return;
    }

    await supabase.from("transactions").insert([
      {
        user_id: profile.id,
        type: "withdraw",
        amount: value,
      },
    ]);

    setMsg("تم إرسال الطلب");
    setAmount("");
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-lamoraBlack text-white">
        <Navbar />
        <div className="page-container mt-10">جارٍ التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lamoraBlack text-white">
      <Navbar />

      <main className="page-container mt-10 space-y-6">
        <div className="card">
          <h2 className="text-lg font-bold">طلب سحب</h2>
          <p className="text-gray-400 mt-2">
            رصيدك الحالي: ${profile.balance}
          </p>

          <input
            type="number"
            className="input mt-3"
            value={amount}
            placeholder="المبلغ"
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={submitWithdraw}
            className="btn-gold mt-4 w-full"
          >
            إرسال الطلب
          </button>

          {msg && (
            <p className="text-center text-sm text-gray-300 mt-3">
              {msg}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
