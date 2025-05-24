"use client";
import type { Language } from "@/types/localization";
import { useRef } from "react";

export function LanguageSwitcher({
  currentLocale,
  languages,
}: {
  currentLocale: Language;
  languages: Language[];
}) {
  const forms = useRef<{ [key: string]: HTMLFormElement | null }>({});

  function handleClick(lang) {
    // Set cookie and use client-side navigation for best UX
    document.cookie = `preferred_language=${lang}; path=/; max-age=31536000`;
    window.location.href = `/${lang}`;
  }

  return (
    <div className='flex gap-4'>
      {languages.map((language) => (
        <form
          key={language}
          ref={(el) => {
            forms.current[language] = el;
          }}
          method='POST'
          action='/api/set-language'
          style={{ display: "inline" }}
          onSubmit={(e) => {
            // If JS enabled, use client-side navigation instead
            e.preventDefault();
            handleClick(language);
          }}
        >
          <input type='hidden' name='lang' value={language} />
          <button
            type='submit'
            className={`px-4 py-2 rounded ${
              language === currentLocale
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {language.toUpperCase()}
          </button>
        </form>
      ))}
    </div>
  );
}
