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

/** Conteúdo das páginas legais (Privacidade e Termos) da V6.0. */
export default function LegalContent({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useI18n();

  return (
    <main id="main" tabIndex={-1}>
      <section className="flex flex-col gap-10 text-text p-10 max-w-xl">
        <LegalTitle subtitle={t(`${kind}.kicker`)} title={t(`${kind}.h1`)} />
        <p className="font-light">{t(`${kind}.lead`)}</p>
        <div className="flex flex-col gap-10">
          {SECTIONS.map(([head, body]) => (
            <LegalNotes
              key={head}
              title={t(`${kind}.${head}`)}
              description={t(`${kind}.${body}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
