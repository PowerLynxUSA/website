export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

export const languages: Language[] = [
  { code: "EN", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "AM", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹" },
  { code: "AR", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ZH", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳" },
  { code: "ZH-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼" },
  { code: "NL", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "TL", name: "Filipino", nativeName: "Filipino", flag: "🇵🇭" },
  { code: "FR", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "DE", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "HI", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "ID", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "IT", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "JA", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "KO", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "PL", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  { code: "PT", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "RU", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "ES", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "SW", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪" },
  { code: "SV", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪" },
  { code: "TH", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  { code: "TR", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "UK", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦" },
  { code: "VI", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
];
