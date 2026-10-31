import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Dict, type Lang } from "../i18n/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t: Dict = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

/** Format a USD price according to the active language */
export function formatPrice(usd: number, lang: Lang): string {
  if (lang === "ja") {
    return `¥${(usd * 150).toLocaleString("ja-JP")}`;
  }
  return `$${usd.toLocaleString("en-US")}`;
}
