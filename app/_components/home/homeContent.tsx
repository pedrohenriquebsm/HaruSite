"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { asset } from "@/app/_lib/assets";
import { useI18n } from "@/app/_lib/i18n";
import Newsletter from "../newsletter/newsletter";

/**
 * Seções editoriais da home (marca, por que, matéria, cartas, contato).
 * Alinhado com a versão V6.2.0.
 */
export default function HomeContent() {
  const { t } = useI18n();

  return (
    <>
      {/* Seção A Marca */}
      <section
        className="flex flex-col text-text items-center text-center h-fit py-28 px-6 gap-8 max-w-4xl mx-auto"
        id="marca"
      >
        <div id="brand" className="-translate-y-28" />
        <p className="reveal uppercase font-light text-xs tracking-widest text-muted">
          {t("brand.kicker")}
        </p>
        <h2 className="reveal font-[Cormorant_Garamond_Variable] text-5xl md:text-7xl font-medium leading-tight">
          {t("brand.quote")}
        </h2>
        <p className="reveal font-light text-base md:text-lg max-w-xl text-text/90 leading-relaxed">
          {t("brand.lead")}
        </p>
        <div className="reveal relative aspect-[16/10] w-full max-w-2xl rounded-xl overflow-hidden mt-4 shadow-sm">
          <Image
            alt={t("brand.alt")}
            src={asset("/background/marca-crina.jpg")}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Seção Por Que HARU */}
      <section className="py-28 px-6 md:px-12 bg-olive-deep text-white flex flex-col gap-10" id="porque">
        <div className="max-w-6xl mx-auto w-full">
          <p className="reveal uppercase font-extralight tracking-widest text-xs text-white/70">
            {t("why.kicker")}
          </p>
          <h2 className="reveal font-[Cormorant_Garamond_Variable] text-4xl md:text-5xl font-medium mt-2">
            {t("why.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-12">
            {(
              [
                ["01", "why1.name", "why1.text"],
                ["02", "why2.name", "why2.text"],
                ["03", "why3.name", "why3.text"],
              ] as const
            ).map(([index, name, text]) => (
              <article
                key={index}
                className="reveal flex flex-col gap-3"
              >
                <p className="font-extralight text-xs text-white/60 tracking-widest">{index}</p>
                <h3 className="font-[Cormorant_Garamond_Variable] text-2xl md:text-3xl font-normal">
                  {t(name)}
                </h3>
                <p className="font-light text-sm text-white/80 leading-relaxed">{t(text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Seção O Hábito (Matéria preview) */}
      <section
        className="flex flex-col items-center max-w-xl mx-auto text-center text-text gap-6 py-32 px-6"
        id="materia"
      >
        <p className="reveal uppercase font-light tracking-widest text-xs text-muted">
          {t("matter.kicker")}
        </p>
        <h2 className="reveal font-[Cormorant_Garamond_Variable] text-4xl md:text-5xl font-medium leading-tight">
          {t("matter.title")}
        </h2>
        <p className="reveal font-light text-sm md:text-base text-text/85 leading-relaxed">
          {t("matter.lead")}
        </p>
        <Link
          href="/microplastic"
          className="reveal btn btn-outline border-olive-deep text-olive-deep hover:bg-olive-deep hover:text-white font-light uppercase tracking-widest text-xs px-8 py-3.5 mt-2"
        >
          {t("matter.cta")}
        </Link>
      </section>

      {/* Seção Cartas (Newsletter) */}
      <Newsletter />

      {/* Seção Contato */}
      <section
        className="relative text-center py-40 md:py-52 text-white overflow-hidden"
        id="contato"
      >
        <div id="contact" className="-translate-y-40" />
        <div className="absolute inset-0 z-1 bg-forest/65" />
        <Image
          alt=""
          src={asset("/background/contact-horses.jpg")}
          fill
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover"
        />
        <div className="z-10 flex flex-col gap-6 mx-auto relative max-w-xl px-6">
          <h2 className="reveal font-[Cormorant_Garamond_Variable] text-5xl md:text-6xl font-medium leading-tight">
            {t("contact.title")}
          </h2>
          <p className="reveal font-light text-sm md:text-base text-white/90 leading-relaxed">
            {t("contact.text")}
          </p>
          <nav
            className="reveal flex flex-wrap justify-center gap-4 text-xs uppercase tracking-widest pt-4"
            aria-label={t("contact.ways")}
          >
            <a
              className="btn btn-outline border-white/60 text-white hover:bg-white hover:text-forest font-light gap-2 px-5"
              href="mailto:contato@haru.natural"
              aria-label={t("contact.emailAria")}
            >
              <Mail size={16} />
              {t("contact.email")}
            </a>
            <a
              className="btn btn-outline border-white/60 text-white hover:bg-white hover:text-forest font-light gap-2 px-5"
              href="https://www.instagram.com/harunaturais/"
              rel="noopener noreferrer"
              target="_blank"
              aria-label={t("contact.ig")}
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.9-1.7-5-4.9C2 15.6 2 15.3 2 12s0-3.6.1-4.8C2.2 4 3.8 2.4 7.1 2.3 8.4 2.2 8.7 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0z" />
                <path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
                <circle cx="18.4" cy="5.6" r="1.4" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              className="btn btn-outline border-white/60 text-white hover:bg-white hover:text-forest font-light gap-2 px-5"
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("contact.wa")}
            >
              <Phone size={16} />
              {t("contact.wa")}
            </a>
          </nav>
        </div>
      </section>
    </>
  );
}
