"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRow, setUserRow] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    setUserRow(data || null);
  }

  const handleWithdraw = async () => {
    setMsg("");
    if (!amount || isNaN(amount)) {
      setMsg("أدخل مبلغاً صالحاً");
      return;
    }

    const value = Number(amount);
    if (value <= 0) {
      setMsg("المبلغ يجب أن يكون أكبر من 0");
      return;
    }

    if (!userRow  value > Number(userRow.balance  0)) {
      setMsg("المبلغ أكبر من رصيدك المتاح");
      return;
    }

    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    // نضيف سجل في جدول العمليات
    const { error } = await supabase.from("transactions").insert([
      {
        user_id: user.id,
        type: "withdraw",
        amount: value
      }
    ]);

    if (error) {
      console.error(error);
      setMsg("حدث خطأ أثناء إرسال طلب السحب");
      setLoading(false);
      return;
    }

    setMsg("تم تسجيل طلب السحب، سيتم مراجعته من الإدارة.");
    setLoading(false);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-lamoraBlack">
      <Navbar />
      <main className="page-container max-w-md">
        <div className="card space-y-4 mt-6">
          <h2 className="text-xl font-bold text-center text-lamoraGold">
            طلب سحب رصيد
          </h2>

          {userRow && (
            <p className="text-center text-sm text-gray-300">
              رصيدك الحالي:{" "}
              <span className="text-lamoraGold font-semibold">
                ${Number(userRow.balance || 0).toFixed(2)}
              </span>
            </p>
          )}

          <input
            className="input"
            type="number"
            placeholder="المبلغ المطلوب سحبه"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={handleWithdraw}
            disabled={loading}
            className="btn-gold w-full disabled:opacity-60"
          >
            {loading ? "جاري الإرسال..." : "إرسال الطلب"}
          </button>

          {msg && (
            <p className="text-center text-sm text-gray-200">{msg}</p>
          )}

          <p className="text-xs text-gray-400 text-center">
            السحب هنا تجريبي، لا توجد عمليات مالية حقيقية داخل Lamora.
          </p>
        </div>
      </main>
    </div>
  );
}
