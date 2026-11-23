"use client";

import LegalTitle from "../legalTitle/legalTitle";
import { useI18n } from "@/app/_lib/i18n";

const QUESTIONS = ["use.q1", "use.q2", "use.q3", "use.q4", "use.q5", "use.q6"];
const ANSWERS = [
  "use.a1p1",
  "use.a2p1",
  "use.a3p1",
  "use.a4p1",
  "use.a5p1",
  "use.a6p1",
];

export default function UseNotesContent() {
  const { t } = useI18n();

  return (
    <main id="conteudo" className="max-w-4xl mx-auto px-6 md:px-12 py-16">
      <section className="flex flex-col gap-8 text-text max-w-2xl">
        <div className="reveal">
          <LegalTitle subtitle={t("use.kicker")} title={t("use.h1")} />
        </div>
        <p className="reveal font-light text-base md:text-lg text-text/90 leading-relaxed">
          {t("use.lead")}
        </p>

        <div className="flex flex-col gap-4 mt-4">
          {QUESTIONS.map((question, index) => (
            <details
              key={question}
              className="reveal border border-black/10 rounded-lg p-5 bg-white/40 group open:bg-white/80 transition-colors"
            >
              <summary className="font-[Cormorant_Garamond_Variable] text-2xl font-medium cursor-pointer list-none flex items-center justify-between text-olive-deep">
                <span>{t(question)}</span>
                <span className="text-xl text-muted font-mono transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="pt-4 text-sm md:text-base font-light text-text/90 leading-relaxed border-t border-black/5 mt-3">
                <p>{t(ANSWERS[index])}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
