"use client";

import Link from "next/link";
import { useI18n } from "./_lib/i18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-[65vh] flex-col items-center justify-center gap-8 px-6 py-24 text-center"
    >
      <p className="font-[Cormorant_Garamond_Variable] text-7xl font-medium tracking-[0.25em]">
        404
      </p>
      <p className="max-w-md font-light text-muted">{t("notfound.text")}</p>
      <Link
        href="/"
        className="btn btn-outline btn-sm uppercase tracking-widest"
      >
        {t("notfound.home")}
      </Link>
    </main>
  );
}
