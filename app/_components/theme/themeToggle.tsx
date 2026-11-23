"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/app/_lib/i18n";

export default function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<"clara" | "kraft">("clara");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") === "kraft"
        ? "kraft"
        : "clara";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
  }, []);

  function flip() {
    const root = document.documentElement;
    const next = theme === "kraft" ? "clara" : "kraft";
    root.setAttribute("data-theme", next);
    setTheme(next);
    try {
      window.localStorage.setItem("haru-theme", next);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      className="btn btn-ghost hover:bg-transparent border-0 p-2 text-olive-deep"
      onClick={flip}
      aria-pressed={theme === "kraft"}
      aria-label={theme === "kraft" ? t("theme.toClara") : t("theme.toKraft")}
    >
      {/* Ícone Lua (Modo Clara ativo -> clique para ir ao Kraft) */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`w-5 h-5 fill-none stroke-current transition-transform duration-300 ${
          theme === "kraft" ? "hidden" : "block"
        }`}
      >
        <circle cx="12" cy="12" r="8.4" strokeWidth="1.2" strokeOpacity="0.35" />
        <path
          d="M16.5 12.5A6.5 6.5 0 0 1 11 5.1 7 7 0 1 0 18.9 13a6.5 6.5 0 0 1-2.4-.5Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>

      {/* Ícone Sol (Modo Kraft ativo -> clique para voltar ao Clara) */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`w-5 h-5 fill-none stroke-current transition-transform duration-300 ${
          theme === "kraft" ? "block" : "hidden"
        }`}
      >
        <circle cx="12" cy="12" r="4" strokeWidth="1.2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M12 3v1.6M12 19.4V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.6M19.4 12H21M4.9 19.1 6 18M18 6l1.1-1.1" />
        </g>
      </svg>
    </button>
  );
}
