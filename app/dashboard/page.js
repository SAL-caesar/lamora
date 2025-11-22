{/* الرصيد */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="lamora-glass p-4">
          <div className="text-xs text-gray-400">
            {t("رصيد المحفظة", "Wallet balance")}
          </div>
          <div className="text-3xl font-bold mt-2">${profile.balance?.toFixed(2) || "0.00"}</div>
          <div className="text-[11px] text-gray-400 mt-1">
            {t(
              "تشمل مكافآت الإحالات (3$ لكل مستخدم جديد).",
              "Includes referral rewards ($3 per new user)."
            )}
          </div>
        </div>

        <div className="lamora-glass p-4">
          <div className="text-xs text-gray-400">
            {t("كود الإحالة الخاص بك", "Your referral code")}
          </div>
          <div className="text-2xl font-mono font-semibold mt-2">
            {profile.referral_code}
          </div>
        </div>

        <div className="lamora-glass p-4">
          <div className="text-xs text-gray-400">
            {t("عدد الإحالات (تقريبي)", "Approx. referrals")}
          </div>
          <div className="text-2xl font-bold mt-2">
            {Math.floor((profile.balance || 0) / 3)}
          </div>
        </div>
      </div>

      {/* رابط الإحالة */}
      <div className="lamora-glass p-4">
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <h2 className="font-semibold text-sm">
            {t("رابط الإحالة الخاص بك", "Your referral link")}
          </h2>
          <button
            className="text-xs border border-white/20 px-3 py-1 rounded-lg hover:border-lamoraPrimary"
            onClick={() => {
              if (typeof window !== "undefined") {
                navigator.clipboard.writeText(refLink);
              }
            }}
          >
            {t("نسخ الرابط", "Copy link")}
          </button>
        </div>
        <div className="bg-black/50 rounded-lg px-3 py-2 text-xs break-all">
          {refLink}
        </div>
        <div className="text-[11px] text-gray-400 mt-1">
          {t(
            "كل مستخدم يسجّل من هذا الرابط يمنحك 3$ تضاف مباشرة إلى رصيدك.",
            "Every user who signs up from this link gives you $3 instantly."
          )}
        </div>
      </div>
    </div>
  );
}
