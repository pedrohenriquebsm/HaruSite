"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/app/_lib/i18n";

/**
 * Na V6.2 o suporte de diatomito saiu da coleção.
 * A página redireciona o visitante diretamente para a vitrine na página inicial.
 */
export default function SuporteRedirect() {
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    router.replace("/#store");
  }, [router]);

  return (
    <main className="p-20 text-center flex flex-col items-center gap-6">
      <p className="font-[Cormorant_Garamond_Variable] text-3xl">
        {t("shop.title")}
      </p>
      <Link
        href="/#store"
        className="btn bg-olive-deep text-white font-light uppercase tracking-widest text-sm"
      >
        {t("product.back")}
      </Link>
    </main>
  );
}
