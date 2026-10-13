"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/app/_lib/i18n";

const KEY = "haru-letter";
const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function readList(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Seção "Cartas" da V6.0: a lista fica só neste aparelho, sem servidor. */
export default function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!emailOk(value)) {
      setNote(t("letter.err"));
      return;
    }
    const list = readList();
    if (list.includes(value)) {
      setNote(t("letter.dup"));
      return;
    }
    list.push(value);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
    setDone(true);
    setNote(t("letter.ok"));
  }

  return (
    <section
      className="flex flex-col place-items-center text-center gap-5 py-30 px-5 text-text"
      id="cartas"
    >
      <p className="uppercase tracking-widest text-sm font-light">
        {t("letter.kicker")}
      </p>
      <h2 className="font-[Cormorant_Garamond_Variable] text-5xl font-medium min-w-auto max-w-2xl">
        {t("letter.title")}
      </h2>
      <p className="font-light min-w-auto max-w-xl">{t("letter.text")}</p>
      <form
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4"
        onSubmit={submit}
        noValidate
      >
        <label className="sr-only" htmlFor="letterEmail">
          {t("letter.label")}
        </label>
        <input
          id="letterEmail"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("letter.placeholder")}
          disabled={done}
          className="input input-bordered flex-1 bg-transparent"
        />
        <button
          type="submit"
          disabled={done}
          className="btn bg-olive-deep font-light tracking-widest text-white uppercase text-sm"
        >
          {t("letter.submit")}
        </button>
      </form>
      {note && (
        <p className="text-sm font-light text-muted" role="status">
          {note}
        </p>
      )}
    </section>
  );
}
