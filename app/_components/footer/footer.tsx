"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderNavButtons from "../header/headerNavButtons";
import LanguageToggle from "../languageToggle/languageToggle";
import { asset } from "@/app/_lib/assets";
import { useI18n } from "@/app/_lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-black/5 py-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-10 text-muted">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Brand */}
        <div className="flex gap-3 justify-center md:justify-start items-center">
          <Image
            src={asset("/logos/logo-olive.png")}
            alt=""
            width={48}
            height={56}
            className="w-8 h-auto"
          />
          <Link
            href="/#top"
            className="font-[Cormorant_Garamond_Variable] font-bold text-xl tracking-[0.2em] text-olive-deep hover:opacity-80 transition-opacity"
          >
            HARU
          </Link>
        </div>

        {/* Links de navegação */}
        <nav aria-label={t("footer.nav")}>
          <ul className="text-xs uppercase tracking-widest gap-6 justify-center flex flex-wrap text-muted font-light">
            <HeaderNavButtons />
          </ul>
        </nav>

        {/* Idioma e Assinatura */}
        <div className="flex items-center justify-center md:justify-end gap-4">
          <LanguageToggle showLabel={true} />
          <span className="hidden sm:inline w-px h-4 bg-black/15" />
          <p className="text-xs font-light text-text/80">{t("footer.copy")}</p>
        </div>
      </div>

      {/* Linha Legal */}
      <div className="border-t border-black/5 pt-6 text-center text-xs font-light text-muted flex flex-wrap gap-2 sm:gap-4 justify-center items-center">
        <span>{t("legal.copy")}</span>
        <span aria-hidden="true">·</span>
        <Link
          href="/privacy"
          className="hover:text-olive-deep underline-offset-4 hover:underline"
        >
          {t("legal.privacy")}
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          href="/terms"
          className="hover:text-olive-deep underline-offset-4 hover:underline"
        >
          {t("legal.terms")}
        </Link>
      </div>
    </footer>
  );
}
