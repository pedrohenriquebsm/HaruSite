"use client";

import { useI18n } from "./_lib/i18n";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { t } = useI18n();

  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-[65vh] flex-col items-center justify-center gap-8 px-6 py-24 text-center"
    >
      <p className="font-[Cormorant_Garamond_Variable] text-5xl font-medium tracking-[0.15em]">
        {t("error.title")}
      </p>
      <p className="max-w-md font-light text-muted">{t("error.text")}</p>
      <button
        type="button"
        onClick={retry}
        className="btn btn-outline btn-sm uppercase tracking-widest"
      >
        {t("error.retry")}
      </button>
    </main>
  );
}
