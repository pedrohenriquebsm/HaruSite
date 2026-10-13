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

/** Notas de uso (acordeão) da V6.0. */
export default function UseNotesContent() {
  const { t } = useI18n();

  return (
    <main id="main" tabIndex={-1}>
      <section className="flex flex-col gap-5 text-text p-10 max-w-xl">
        <LegalTitle subtitle={t("use.kicker")} title={t("use.h1")} />
        <p className="font-light">{t("use.lead")}</p>
        <div className="join join-vertical">
          {QUESTIONS.map((question, index) => (
            <div
              key={question}
              className="collapse collapse-arrow join-item border-base-300 border"
            >
              <input
                type="radio"
                name="use-notes-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title font-semibold font-[Cormorant_Garamond_Variable] text-2xl">
                {t(question)}
              </div>
              <div className="collapse-content text-sm">
                {t(ANSWERS[index])}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
