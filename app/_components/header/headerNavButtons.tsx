"use client";

import Link from "next/link";
import { useI18n } from "@/app/_lib/i18n";

export default function HeaderNavButtons({ onItemClick }: { onItemClick?: () => void }) {
  const { t } = useI18n();

  return (
    <>
      <li>
        <Link
          href="/#loja"
          onClick={onItemClick}
          className="p-2 hover:text-olive-deep transition-colors"
        >
          {t("nav.shop")}
        </Link>
      </li>
      <li>
        <Link
          href="/#marca"
          onClick={onItemClick}
          className="p-2 hover:text-olive-deep transition-colors"
        >
          {t("nav.brand")}
        </Link>
      </li>
      <li>
        <Link
          href="/microplastic"
          onClick={onItemClick}
          className="p-2 hover:text-olive-deep transition-colors"
        >
          {t("nav.matter")}
        </Link>
      </li>
      <li>
        <Link
          href="/use-notes"
          onClick={onItemClick}
          className="p-2 hover:text-olive-deep transition-colors"
        >
          {t("nav.use")}
        </Link>
      </li>
      <li>
        <Link
          href="/#contato"
          onClick={onItemClick}
          className="p-2 hover:text-olive-deep transition-colors"
        >
          {t("nav.contact")}
        </Link>
      </li>
    </>
  );
}
