// @ts-nocheck
import { createContext, useContext, useEffect, useState } from "react";

const LangCtx = createContext({ lang: "en", setLang: (_l) => {}, tr: (en, _fr) => en });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("luma.lang");
      if (saved === "fr" || saved === "en") setLangState(saved);
    } catch {}
  }, []);
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("luma.lang", l); } catch {}
  };
  const tr = (en, fr) => (lang === "fr" && fr ? fr : en);
  return <LangCtx.Provider value={{ lang, setLang, tr }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
