"use client";

import Navbar from "components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="p-10">
        <h1 className="text-4xl font-bold text-center text-yellow-400">
          منصة Lamora — استثمــار آمن وذكي
        </h1>

        <p className="text-center mt-4 text-gray-300">
          اختر خطتك الاستثمارية وابدأ بجني الأرباح
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <a
            href="/auth/signup"
            className="bg-yellow-500 px-6 py-3 rounded-lg font-bold"
          >
            حساب جديد
          </a>

          <a
            href="/auth/login"
            className="bg-gray-700 px-6 py-3 rounded-lg font-bold"
          >
            تسجيل الدخول
          </a>
        </div>
      </section>
    </main>
  );
}
