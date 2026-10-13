"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/app/_lib/i18n";

export default function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<"clara" | "kraft">("clara");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lê o tema que o script de boot já aplicou
    setTheme(
      document.documentElement.getAttribute("data-theme") === "kraft"
        ? "kraft"
        : "clara",
    );
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
      className="btn bg-transparent hover:bg-transparent border-0"
      onClick={flip}
      aria-pressed={theme === "kraft"}
      aria-label={theme === "kraft" ? t("theme.toClara") : t("theme.toKraft")}
    >
      <Moon className="theme-toggle__moon" size={15} />
      <Sun className="theme-toggle__sun" size={15} />
    </button>
  );
}
