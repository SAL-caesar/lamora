"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { supabase } from "../../lib/supabaseClient";

export default function WithdrawPage() {
  const [profile, setProfile] = useState(null);
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState("");

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

  const sendRequest = async () => {
    if (!value || Number(value) <= 0) {
      setMsg("أدخل مبلغ صحيح");
      return;
    }

    if (Number(value) > Number(profile.balance)) {
      setMsg("المبلغ المطلوب أكبر من رصيدك الحالي");
      return;
    }

    await supabase.from("transactions").insert({
      user_id: profile.id,
      type: "withdraw",
      amount: Number(value),
      status: "pending",
    });

    setMsg("تم إرسال طلب السحب بنجاح");
  };

  if (!profile) return <p className="text-white p-10">جاري التحميل...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">طلب سحب</h1>

        <input
          className="bg-gray-800 p-3 rounded w-full"
          placeholder="المبلغ"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          onClick={sendRequest}
          className="mt-4 bg-yellow-500 text-black p-3 rounded w-full"
        >
          إرسال الطلب
        </button>

        {msg && <p className="mt-4 text-yellow-400">{msg}</p>}
      </div>
    </div>
  );
}
