"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import translations from "@/app/_data/translations.json";

export type Lang = "pt" | "en";

type Dict = Record<string, string>;
const DICT = translations as Record<Lang, Dict>;

const KEY = "haru-lang";

interface I18nValue {
  lang: Lang;
  /** Traduz uma chave de `_data/translations.json`, interpolando `{vars}`. */
  t: (key: string, vars?: Record<string, string | number>) => string;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nValue>({
  lang: "pt",
  t: (key) => key,
  toggleLang: () => {},
});

/** Mesma detecção do `js/boot.js`: `?lang=`, `localStorage`, idioma do navegador. */
function detectLang(): Lang {
  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "en" || param === "pt") return param;
    const saved = window.localStorage.getItem(KEY);
    if (saved === "en" || saved === "pt") return saved;
    const list =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language];
    for (const code of list) {
      if (code === "en" || code?.startsWith("en")) return "en";
    }
  } catch {
    /* storage bloqueado: fica em pt */
  }
  return "pt";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // O idioma real só é conhecido no cliente; o script inline do layout já
  // deixou `data-lang` correto antes da hidratação.
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resolve o idioma salvo/navegador depois da hidratação
    setLang(detectLang());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-lang", lang);
    root.lang = lang === "en" ? "en" : "pt-BR";
    try {
      window.localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let text = DICT[lang][key] ?? DICT.pt[key] ?? key;
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.split(`{${name}}`).join(String(value));
        }
      }
      return text;
    },
    [lang],
  );

  const toggleLang = useCallback(() => {
    setLang((current) => (current === "pt" ? "en" : "pt"));
  }, []);

  const value = useMemo(
    () => ({ lang, t, toggleLang }),
    [lang, t, toggleLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

/** Formata centavos/reais no padrão do site original (`R$ 48`). */
export function money(value: number) {
  return `R$ ${value}`;
}
