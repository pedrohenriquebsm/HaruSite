"use client";

import LegalNotes from "../legalNotes/legalNotes";
import LegalTitle from "../legalTitle/legalTitle";
import { useI18n } from "@/app/_lib/i18n";

const SECTIONS = [
  ["h2a", "p1"],
  ["h2b", "p2"],
  ["h2c", "p3"],
  ["h2d", "p4"],
  ["h2e", "p5"],
] as const;

/** Conteúdo das páginas legais (Privacidade e Termos) da V6.2. */
export default function LegalContent({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useI18n();

  return (
    <main id="conteudo" className="max-w-4xl mx-auto px-6 md:px-12 py-16">
      <section className="flex flex-col gap-10 text-text max-w-2xl">
        <div className="reveal">
          <LegalTitle subtitle={t(`${kind}.kicker`)} title={t(`${kind}.h1`)} />
        </div>
        <p className="reveal font-light text-base md:text-lg text-text/90 leading-relaxed">
          {t(`${kind}.lead`)}
        </p>
        <div className="flex flex-col gap-10 mt-2">
          {SECTIONS.map(([head, body]) => (
            <div key={head} className="reveal">
              <LegalNotes
                title={t(`${kind}.${head}`)}
                description={t(`${kind}.${body}`)}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
