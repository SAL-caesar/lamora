"use client";

import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-lamoraBlack text-white">
      <Navbar />

      <main className="page-container">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-lamoraGold">Lamora</h1>
          <p className="text-gray-300 mt-3 text-sm">
            منصة استثمار احترافية مع نظام مكافآت وإحالات
          </p>
        </div>

        <div className="card mt-10">
          <h2 className="text-lg font-bold mb-3">الباقات</h2>
          <p className="text-gray-300 text-sm">قريباً سيتم عرض الباقات</p>
        </div>

        <div className="text-center mt-10">
          <a
            href="/auth/signup"
            className="btn-gold px-6 py-3 inline-block"
          >
            إنشاء حساب
          </a>
        </div>
      </main>
    </div>
  );
}
