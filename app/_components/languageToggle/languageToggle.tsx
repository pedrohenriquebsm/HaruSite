"use client";

import { useI18n } from "@/app/_lib/i18n";

export default function LanguageToggle({ showLabel = true }: { showLabel?: boolean }) {
  const { lang, t, toggleLang } = useI18n();

  return (
    <button
      type="button"
      className="btn btn-ghost hover:bg-transparent border-0 font-light text-xs tracking-widest uppercase flex items-center gap-1.5 p-2 text-olive-deep"
      onClick={toggleLang}
      aria-label={lang === "pt" ? t("lang.toEn") : t("lang.toPt")}
    >
      {/* Selo Hanko autêntico HARU */}
      <svg className="w-5 h-5" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="25.4" y="15.2" width="28.6" height="35.2" rx="5.2" fill="currentColor" fillOpacity="0.15" />
        <text
          x="37.4"
          y="45.6"
          fill="currentColor"
          fontFamily="'Noto Sans JP', sans-serif"
          fontSize="18.5"
          fontWeight="500"
        >
          ほ
        </text>
        <path
          fill="currentColor"
          d="M16.5 8.9h20.4c3.5 0 6.3 2.8 6.3 6.3L28.1 52.2H16.5c-3.5 0-6.3-2.8-6.3-6.3V15.2c0-3.5 2.8-6.3 6.3-6.3z"
        />
        <path
          fill="currentColor"
          fillOpacity="0.75"
          d="M32.1 43.2 28.1 52.2 38.6 56.4 41.4 47.1z"
        />
        <path
          fill="var(--color-ivory, #f6f1e8)"
          d="M16.9 21.5h4.1v7.5h7.3v-7.5h4.1V41.2h-4.1v-8.1h-7.3v8.1h-4.1z"
        />
      </svg>
      {showLabel && <span>{lang === "pt" ? "EN" : "PT"}</span>}
    </button>
  );
}
