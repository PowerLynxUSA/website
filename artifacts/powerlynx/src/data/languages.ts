export type LanguageCode =
  | "EN"
  | "ES"
  | "PT"
  | "FR"
  | "DE"
  | "ZH"
  | "ZH-TW"
  | "KO"
  | "JA";

export type Language = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
};

export const languages: Language[] = [
  { code: "EN", name: "English", nativeName: "English", flag: "🇺🇸 🇬🇧" },
  { code: "ES", name: "Spanish", nativeName: "Español", flag: "🇪🇸 🇲🇽" },
  { code: "FR", name: "French", nativeName: "Français", flag: "🇫🇷 🇨🇦" },
  { code: "PT", name: "Portuguese", nativeName: "Português", flag: "🇵🇹 🇧🇷" },
  { code: "DE", name: "German", nativeName: "Deutsch", flag: "🇩🇪 🇦🇹" },
  { code: "ZH", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳 🇸🇬" },
  { code: "ZH-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼 🇭🇰" },
  { code: "KO", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "JA", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
];
