import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { languages, type LanguageCode } from "@/data/languages";
import { translations, type TranslationKey } from "./translations";

const STORAGE_KEY = "powerlynx-language";

const fontProfiles: Record<LanguageCode, { sans: string; display: string }> = {
  EN: { sans: "'Barlow', sans-serif", display: "'Oswald', sans-serif" },
  ES: { sans: "'Inter', sans-serif", display: "'Inter', sans-serif" },
  ZH: { sans: "'Inter', 'Noto Sans SC', sans-serif", display: "'Inter', 'Noto Sans SC', sans-serif" },
  "ZH-TW": { sans: "'Inter', 'Noto Sans TC', sans-serif", display: "'Inter', 'Noto Sans TC', sans-serif" },
  PT: { sans: "'Inter', sans-serif", display: "'Inter', sans-serif" },
  FR: { sans: "'Inter', sans-serif", display: "'Inter', sans-serif" },
  DE: { sans: "'Inter', sans-serif", display: "'Inter', sans-serif" },
  JA: { sans: "'Inter', 'Noto Sans JP', sans-serif", display: "'Inter', 'Noto Sans JP', sans-serif" },
  KO: { sans: "'Inter', 'Noto Sans KR', sans-serif", display: "'Inter', 'Noto Sans KR', sans-serif" },
};

type LanguageContextValue = {
  language: LanguageCode;
  languageInfo: (typeof languages)[number];
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return "EN";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
  return stored && languages.some((language) => language.code === stored) ? stored : "EN";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  useEffect(() => {
    const profile = fontProfiles[language];
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dataset.language = language;
    document.documentElement.style.setProperty("--app-font-sans", profile.sans);
    document.documentElement.style.setProperty("--app-font-display", profile.display);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    const languageInfo = languages.find((item) => item.code === language) ?? languages[0];

    return {
      language,
      languageInfo,
      setLanguage,
      t: (key) => translations[language][key] ?? translations.EN[key] ?? key,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}