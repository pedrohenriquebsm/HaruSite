"use client";

import { useI18n } from "@/app/_lib/i18n";

/** Link de pular para o conteúdo (acessibilidade), igual ao da V6.0. */
export default function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main"
      onClick={() => {
        // O SmoothScroll intercepta cliques em âncoras; movemos o foco aqui
        // para que o Tab continue a partir do conteúdo, não do cabeçalho.
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ivory focus:px-4 focus:py-2 focus:text-sm focus:text-text focus:shadow"
    >
      {t("skip")}
    </a>
  );
}
