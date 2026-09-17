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
];
