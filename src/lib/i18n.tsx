import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "fr";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (en: string, fr?: string) => string;
}

const LangCtx = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  tr: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("luma.lang");
      if (saved === "fr" || saved === "en") setLangState(saved);
    } catch {
      // localStorage unavailable (private browsing, SSR)
    }
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("luma.lang", l);
    } catch {
      // localStorage unavailable (private browsing, SSR)
    }
  };
  const tr = (en: string, fr?: string) => (lang === "fr" && fr ? fr : en);
  return <LangCtx.Provider value={{ lang, setLang, tr }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
