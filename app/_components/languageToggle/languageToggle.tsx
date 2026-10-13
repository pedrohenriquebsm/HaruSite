"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/app/_lib/i18n";

export default function LanguageToggle() {
  const { lang, t, toggleLang } = useI18n();

  return (
    <button
      type="button"
      className="btn bg-transparent hover:bg-transparent border-0 font-light text-xs tracking-widest uppercase"
      onClick={toggleLang}
      aria-label={lang === "pt" ? t("lang.toEn") : t("lang.toPt")}
    >
      <Languages size={15} />
      <span>{lang === "pt" ? "EN" : "PT"}</span>
    </button>
  );
}
