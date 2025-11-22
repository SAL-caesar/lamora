"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ReferralPage() {
  const [profile, setProfile] = useState(null);
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profileData);

    const { data: referralData } = await supabase
      .from("referrals")
      .select("*")
      .eq("referrer_id", user.id);

    setReferrals(referralData || []);
  }

  if (!profile) return <p>جاري التحميل...</p>;

  const refLink = https://lamora.vercel.app/signup?ref=${profile.ref_code};

  return (
    <div className="ref-page">
      <h2>نظام الإحالة</h2>

      <p>رمز الإحالة الخاص بك:</p>
      <div className="box">{profile.ref_code}</div>

      <p>رابط الإحالة:</p>
      <div className="box">
        {refLink}
        <button
          onClick={() => navigator.clipboard.writeText(refLink)}
        >
          نسخ
        </button>
      </div>

      <h3>الأشخاص الذين دعوتهم:</h3>
      <ul>
        {referrals.map((ref) => (
          <li key={ref.id}>ID: {ref.referred_user_id} — +3$</li>
        ))}
      </ul>
    </div>
  );
}
