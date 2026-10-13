"use client";

import Link from "next/link";
import { useI18n } from "@/app/_lib/i18n";

export default function HeaderNavButtons() {
  const { t } = useI18n();

  return (
    <>
      <li>
        <Link href={"/#store"} className="p-2">
          {t("nav.shop")}
        </Link>
      </li>
      <li>
        <Link href={"/#brand"} className="p-2">
          {t("nav.brand")}
        </Link>
      </li>
      <li>
        <Link href={"/microplastic"} className="p-2">
          {t("nav.matter")}
        </Link>
      </li>
      <li>
        <Link href={"/use-notes"} className="p-2">
          {t("nav.use")}
        </Link>
      </li>
      <li>
        <Link href={"/#contact"} className="p-2">
          {t("nav.contact")}
        </Link>
      </li>
    </>
  );
}
