"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("lamora-lang");
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      if (typeof window !== "undefined") {
        localStorage.setItem("lamora-lang", next);
        document.documentElement.lang = next;
        document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
      }
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
