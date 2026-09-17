import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { languages, type LanguageCode } from "@/data/languages";
import { translations, type TranslationKey } from "./translations";

const STORAGE_KEY = "powerlynx-language";

const fontProfiles: Record<LanguageCode, { sans: string; display: string }> = {
  EN: { sans: "'Montserrat', sans-serif", display: "'Montserrat', sans-serif" },
  ES: { sans: "'Montserrat', sans-serif", display: "'Montserrat', sans-serif" },
  FR: { sans: "'Montserrat', sans-serif", display: "'Montserrat', sans-serif" },
  PT: { sans: "'Montserrat', sans-serif", display: "'Montserrat', sans-serif" },
  DE: { sans: "'Montserrat', sans-serif", display: "'Montserrat', sans-serif" },
  ZH: { sans: "'Inter', 'Noto Sans SC', sans-serif", display: "'Inter', 'Noto Sans SC', sans-serif" },
  "ZH-TW": { sans: "'Inter', 'Noto Sans TC', sans-serif", display: "'Inter', 'Noto Sans TC', sans-serif" },
  KO: { sans: "'Inter', 'Noto Sans KR', sans-serif", display: "'Inter', 'Noto Sans KR', sans-serif" },
  JA: { sans: "'Inter', 'Noto Sans JP', sans-serif", display: "'Inter', 'Noto Sans JP', sans-serif" },
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
      t: (key) => {
        const localized = translations[language][key];

        if (localized === undefined && language !== "EN") {
          // Surfaced so automated checks (see e2e/language-fallback-render.spec.ts)
          // can catch missing translations that would silently show English text.
          // eslint-disable-next-line no-console
          console.warn(`[i18n-fallback] language=${language} key=${key}`);
        }

        return localized ?? translations.EN[key] ?? key;
      },
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