"use client";

import Image from "next/image";
import Link from "next/link";
import { AtSign, Mail, Phone } from "lucide-react";
import { asset } from "@/app/_lib/assets";
import { useI18n } from "@/app/_lib/i18n";
import Newsletter from "../newsletter/newsletter";

/**
 * Seções editoriais da home (marca, por que, matéria, cartas, contato).
 * Fica em componente cliente porque todo o texto acompanha o idioma.
 */
export default function HomeContent() {
  const { t } = useI18n();

  return (
    <>
      <section
        className="flex flex-col text-text items-center text-center h-fit py-30 gap-10 min-w-auto max-w-4xl mx-auto"
        id="brand"
      >
        <h3 className="uppercase font-light text-xs tracking-widest">
          {t("brand.kicker")}
        </h3>
        <h2 className="font-[Cormorant_Garamond_Variable] text-7xl font-medium">
          {t("brand.quote")}
        </h2>
        <p className="font-light min-w-auto max-w-xl">{t("brand.lead")}</p>
        <Image
          alt={t("brand.alt")}
          src={asset("/background/marca-crina.jpg")}
          width={1080}
          height={720}
          className="p-2"
        />
      </section>

      <section className="py-30 px-10 bg-olive-deep text-white flex flex-col gap-10">
        <p className="uppercase font-extralight tracking-widest text-sm">
          {t("why.kicker")}
        </p>
        <p className="font-[Cormorant_Garamond_Variable] text-5xl font-medium">
          {t("why.title")}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mt-10">
          {(
            [
              ["01", "why1.name", "why1.text"],
              ["02", "why2.name", "why2.text"],
              ["03", "why3.name", "why3.text"],
            ] as const
          ).map(([index, name, text]) => (
            <div
              key={index}
              className="flex flex-col gap-5 min-w-auto max-w-sm"
            >
              <p className="font-extralight text-sm text-white/70">{index}</p>
              <p className="font-[Cormorant_Garamond_Variable] text-3xl">
                {t(name)}
              </p>
              <p className="font-extralight">{t(text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col place-items-center min-w-auto max-w-md mx-auto text-center text-text gap-10 py-40 px-2">
        <p className="uppercase font-light tracking-widest text-sm">
          {t("matter.kicker")}
        </p>
        <p className="font-[Cormorant_Garamond_Variable] text-5xl font-medium">
          {t("matter.title")}
        </p>
        <p className="font-light">{t("matter.lead")}</p>
        <Link
          href={"/microplastic"}
          className="btn btn-md text-sm p-5 w-fit font-extralight uppercase bg-transparent border tracking-widest border-black"
        >
          {t("matter.cta")}
        </Link>
      </section>

      <Newsletter />

      <section
        className="relative text-center py-60 text-white"
        id="contact"
      >
        <div className="absolute inset-0 z-1 bg-forest/50" />
        <Image
          alt=""
          src={asset("/background/contact-horses.jpg")}
          width={1920}
          height={1200}
          className="absolute inset-0 z-0 object-cover w-full h-full"
        />
        <div className="z-1 flex flex-col gap-10 mx-auto relative min-w-auto max-w-lg px-5">
          <h2 className="font-[Cormorant_Garamond_Variable] text-6xl font-medium">
            {t("contact.title")}
          </h2>
          <p className="font-light">{t("contact.text")}</p>
          <nav
            className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-widest"
            aria-label={t("contact.ways")}
          >
            <a
              className="btn btn-outline border-white/60 text-white bg-transparent font-light gap-2"
              href="mailto:contato@haru.natural"
              aria-label={t("contact.emailAria")}
            >
              <Mail size={16} />
              {t("contact.email")}
            </a>
            <a
              className="btn btn-outline border-white/60 text-white bg-transparent font-light gap-2"
              href="https://instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <AtSign size={16} />
              Instagram
            </a>
            <span
              className="btn btn-outline border-white/60 text-white bg-transparent font-light gap-2"
              aria-label={t("contact.wa")}
            >
              <Phone size={16} />
              {t("contact.wa")}
            </span>
          </nav>
        </div>
      </section>
    </>
  );
}
