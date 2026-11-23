"use client";

import Link from "next/link";
import { asset } from "@/app/_lib/assets";
import { useI18n } from "@/app/_lib/i18n";
import EssayReel from "../essayReel/essayReel";

export default function EssayContent() {
  const { t } = useI18n();

  const reelCorpo = [
    { src: asset("/background/materia-01-1.jpg"), altKey: "essay.01.alt" },
    { src: asset("/background/materia-01-2.jpg"), altKey: "essay.01.alt2" },
    { src: asset("/background/materia-01-3.jpg"), altKey: "essay.01.alt3" },
    { src: asset("/background/materia-01-4.jpg"), altKey: "essay.01.alt4" },
  ];

  const reelTerra = [
    { src: asset("/background/materia-02-1.jpg"), altKey: "essay.02.alt" },
    { src: asset("/background/materia-02-2.jpg"), altKey: "essay.02.alt2" },
    { src: asset("/background/materia-02-3.jpg"), altKey: "essay.02.alt3" },
    { src: asset("/background/materia-02-4.jpg"), altKey: "essay.02.alt4" },
  ];

  const reelMateria = [
    { src: asset("/background/materia-03-1.jpg"), altKey: "essay.03.alt" },
    { src: asset("/background/materia-03-2.jpg"), altKey: "essay.03.alt2" },
    { src: asset("/background/materia-03-3.jpg"), altKey: "essay.03.alt3" },
    { src: asset("/background/materia-03-4.jpg"), altKey: "essay.03.alt4" },
  ];

  return (
    <main
      id="conteudo"
      className="max-w-6xl mx-auto px-6 md:px-12 py-16 text-olive-deep flex flex-col gap-32 font-[Newsreader_Variable]"
    >
      {/* Cabeçalho da Matéria */}
      <section className="max-w-2xl flex flex-col gap-6">
        <p className="reveal uppercase tracking-widest text-xs font-light text-muted">
          {t("essay.kicker")}
        </p>
        <h1 className="reveal font-[Cormorant_Garamond_Variable] text-5xl md:text-7xl font-medium leading-tight">
          {t("essay.h1")}
        </h1>
        <p className="reveal text-lg md:text-xl font-light leading-relaxed text-text/90">
          {t("essay.lead")}
        </p>
      </section>

      {/* 01 — O corpo */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
        <EssayReel images={reelCorpo} />
        <div className="flex flex-col gap-5 text-base md:text-lg leading-relaxed text-text/90">
          <p className="reveal uppercase tracking-widest text-xs font-light text-muted">
            {t("essay.01.kicker")}
          </p>
          <h2 className="reveal font-[Cormorant_Garamond_Variable] text-3xl md:text-5xl font-medium text-olive-deep">
            {t("essay.01.title")}
          </h2>
          <p className="reveal font-light">{t("essay.01.p1")}</p>
          <p className="reveal font-light">{t("essay.01.p2")}</p>
          <p className="reveal font-light">{t("essay.01.p3")}</p>
        </div>
      </section>

      {/* 02 — A Terra */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
        <div className="flex flex-col gap-5 text-base md:text-lg leading-relaxed text-text/90 order-2 lg:order-1">
          <p className="reveal uppercase tracking-widest text-xs font-light text-muted">
            {t("essay.02.kicker")}
          </p>
          <h2 className="reveal font-[Cormorant_Garamond_Variable] text-3xl md:text-5xl font-medium text-olive-deep">
            {t("essay.02.title")}
          </h2>
          <p className="reveal font-light">{t("essay.02.p1")}</p>
          <p className="reveal font-light">{t("essay.02.p2")}</p>
          <p className="reveal font-light">{t("essay.02.p3")}</p>
        </div>
        <div className="order-1 lg:order-2">
          <EssayReel images={reelTerra} />
        </div>
      </section>

      {/* 03 — A Matéria */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
        <EssayReel images={reelMateria} />
        <div className="flex flex-col gap-5 text-base md:text-lg leading-relaxed text-text/90">
          <p className="reveal uppercase tracking-widest text-xs font-light text-muted">
            {t("essay.03.kicker")}
          </p>
          <h2 className="reveal font-[Cormorant_Garamond_Variable] text-3xl md:text-5xl font-medium text-olive-deep">
            {t("essay.03.title")}
          </h2>
          <p className="reveal font-light">{t("essay.03.p1")}</p>
          <p className="reveal font-light">{t("essay.03.p2")}</p>
          <p className="reveal font-light">{t("essay.03.p3")}</p>
          <p className="reveal font-light">{t("essay.03.p4")}</p>
        </div>
      </section>

      {/* Notas e Retorno à Coleção */}
      <section className="flex flex-col gap-8 pt-8 border-t border-black/10">
        <p className="reveal text-xs text-muted leading-relaxed max-w-2xl font-light">
          {t("essay.notes")}
        </p>
        <Link
          href="/#loja"
          className="reveal btn btn-outline border-olive-deep text-olive-deep hover:bg-olive-deep hover:text-white font-light uppercase tracking-widest text-xs w-fit px-8 py-3.5"
        >
          {t("essay.cta")}
        </Link>
      </section>
    </main>
  );
}
