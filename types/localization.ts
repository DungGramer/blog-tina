export type Language = "en" | "vi";

export type ParamsWithLanguage<T extends object = {}> = {
  locale: Language;
} & T;
