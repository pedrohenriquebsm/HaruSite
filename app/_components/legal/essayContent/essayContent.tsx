"use client";

import Image from "next/image";
import Link from "next/link";
import { asset } from "@/app/_lib/assets";
import { useI18n } from "@/app/_lib/i18n";

/** Ensaio "Matéria" (microplásticos) da V6.0, agora trilíngue via i18n. */
export default function EssayContent() {
  const { t } = useI18n();

  return (
    <main
      id="main"
      tabIndex={-1}
      className="p-10 text-olive-deep flex flex-col gap-40 font-[Newsreader_Variable]"
    >
      <section className="max-w-xl flex flex-col gap-10">
        <h1 className="font-light uppercase tracking-widest text-sm">
          {t("essay.kicker")}
        </h1>
        <h2 className="font-[Cormorant_Garamond_Variable] text-7xl font-medium">
          {t("essay.h1")}
        </h2>
        <p>{t("essay.lead")}</p>
      </section>

      <section className="grid sm:grid-cols-2 items-center grid-cols-1 gap-10">
        <Image
          alt={t("essay.01.alt")}
          src={asset("/background/essay-corpo.jpg")}
          width={1280}
          height={720}
          className="min-w-auto"
        />
        <div className="flex flex-col max-w-2xl gap-5 text-lg">
          <p className="tracking-widest uppercase">{t("essay.01.kicker")}</p>
          <h3 className="font-[Cormorant_Garamond_Variable] text-5xl font-medium">
            {t("essay.01.title")}
          </h3>
          <p>{t("essay.01.p1")}</p>
          <p>{t("essay.01.p2")}</p>
          <p>{t("essay.01.p3")}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 items-center">
        <div className="flex flex-col max-w-2xl gap-5 text-lg sm:order-1 order-2">
          <p className="tracking-widest uppercase">{t("essay.02.kicker")}</p>
          <h3 className="font-[Cormorant_Garamond_Variable] text-5xl font-medium">
            {t("essay.02.title")}
          </h3>
          <p>{t("essay.02.p1")}</p>
          <p>{t("essay.02.p2")}</p>
          <p>{t("essay.02.p3")}</p>
        </div>
        <Image
          alt={t("essay.02.alt")}
          src={asset("/background/essay-planeta.jpg")}
          width={1280}
          height={720}
          className="min-w-auto order-1 sm:order-2"
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 items-center gap-10">
        <Image
          alt={t("essay.03.alt")}
          src={asset("/background/essay-crina.jpg")}
          width={1280}
          height={720}
          className="min-w-auto"
        />
        <div className="flex flex-col max-w-2xl gap-5 text-lg">
          <p className="tracking-widest uppercase">{t("essay.03.kicker")}</p>
          <h3 className="font-[Cormorant_Garamond_Variable] text-5xl font-medium">
            {t("essay.03.title")}
          </h3>
          <p>{t("essay.03.p1")}</p>
          <p>{t("essay.03.p2")}</p>
          <p>{t("essay.03.p3")}</p>
          <p>{t("essay.03.p4")}</p>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <p className="min-w-auto max-w-lg text-xs">{t("essay.notes")}</p>
        <Link
          href="/#store"
          className="btn btn-md text-sm p-5 w-fit font-extralight uppercase bg-transparent border tracking-widest border-black"
        >
          {t("essay.cta")}
        </Link>
      </section>
    </main>
  );
}
